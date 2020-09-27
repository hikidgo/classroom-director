import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';
import { DailySchedule, SchedulesService, WeeklySchedule, WeeklyScheduleReference } from '../../schedules/schedules.service';
import { GoogleSchedulesService } from '../schedules/schedules.service';
import * as moment from 'moment';
import { GoogleRunTaskFactory, RunTaskContext } from './tasks/run-task.factory';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleRunService {
    public runningId$: BehaviorSubject<string>;
    public schedule$: BehaviorSubject<WeeklySchedule>;
    public exception$: BehaviorSubject<Exception>;
    public reference$: BehaviorSubject<WeeklyScheduleReference>;

    constructor(
        private _scheduleService: SchedulesService,
        private _googleSchedulesService: GoogleSchedulesService,
        private _runTaskFactory: GoogleRunTaskFactory,
        private _translate: TranslateService,
        private _router: Router) {
        this.runningId$ = new BehaviorSubject<string>(null);
        this.schedule$ = new BehaviorSubject<WeeklySchedule>(null);
        this.exception$ = new BehaviorSubject<Exception>(null);
        this.reference$ = new BehaviorSubject<WeeklyScheduleReference>(null);
    }

    start() {
        if(this.runningId$.value != null){
            return;
        }
        
        const runningId = uuidv4();
        this.runningId$.next(runningId);
        const reference = this._scheduleService.getCurrent();
        this._googleSchedulesService.get(reference.begin)
            .subscribe(
                x => {
                    this.reference$.next(reference);
                    this.schedule$.next(x.schedule);
                    new Promise(resolve => { this.checkForEvent(runningId) });
                },
                ex => {
                    this.exception$.next(ex);
                    if (ex instanceof UnauthorizedException) {
                        this._router.navigate(['/auth'], { queryParams: { r: this._router.url, m: "REAUTH_MSG" } });
                    }
                }
            );
    }

    async checkForEvent(runningId : string): Promise<void> {
        if (this.runningId$.value !== runningId) {
            return;
        }

        const now = moment();
        const weeklySchedule = this.schedule$.value;
        const reference = this.reference$.value;

        if (reference.begin.getTime() != this._scheduleService.getCurrent().begin.getTime()) {
            this.stop();
            this.start();
            return;
        }

        var schedule: DailySchedule;
        switch (now.day()) {
            case 0:
                schedule = weeklySchedule.sunday;
                break;
            case 1:
                schedule = weeklySchedule.monday;
                break;
            case 2:
                schedule = weeklySchedule.tuesday;
                break;
            case 3:
                schedule = weeklySchedule.wednesday;
                break;
            case 4:
                schedule = weeklySchedule.thursday;
                break;
            case 5:
                schedule = weeklySchedule.friday;
                break;
            case 6:
                schedule = weeklySchedule.saturday;
                break;
        }


        const events = schedule.events.filter(event => {
            const time = moment().startOf('day').add(event.time, 'minutes');
            const timeMin = time.clone().subtract(30, 'seconds');
            const timeMax = time.clone().add(10, 'minutes');

            if (timeMin.isBefore(now) && timeMax.isAfter(now)) {
                return true;
            }
            return false;
        });

        var sessionStateKey = reference.begin.getTime() + ".state";
        var sessionState: string[] = JSON.parse(sessionStorage.getItem(sessionStateKey) ?? "[]");

        for (var i = 0; i < events.length; i++) {
            const e = events[i];
            if (sessionState.indexOf(e.uniqueId) < 0) {
                const subTranslate = this._translate.get('SPEAK').subscribe((res: string) => {
                    var msg = new SpeechSynthesisUtterance();
                    msg.lang = this._translate.currentLang;
                    msg.text = res;
                    window.speechSynthesis.speak(msg);
                });
                sessionState.push(e.uniqueId);

                setTimeout(() => {
                    subTranslate.unsubscribe();
                }, 1000);
            }
            for (var j = 0; j < e.tasks.length; j++) {
                const t = e.tasks[j];
                var svc = this._runTaskFactory.create(t.key);

                try {
                    if (sessionState.indexOf(t.uniqueId) < 0) {
                        const ctx = <RunTaskContext>{
                            weeklyScheduleRef: reference,
                            weeklySchedule: weeklySchedule,
                            dailySchedule: schedule,
                            event: e,
                            task: t
                        };
                        var result = await svc.execute(ctx);
                        if (result == true) {
                            sessionState.push(t.uniqueId);
                        }
                    }

                } catch (e) {
                    this.exception$.next(e);
                }
            };
        };

        sessionStorage.setItem(sessionStateKey, JSON.stringify(sessionState));

        if (this.runningId$.value === runningId) {
            const me = this;
            setTimeout(async () => {
                me.checkForEvent(runningId);
            }, 1000 * 30);
        }
    }

    stop() {
        this.schedule$.next(null);
        this.reference$.next(null);
        this.runningId$.next(null);
    }
}