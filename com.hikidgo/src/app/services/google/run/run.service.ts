import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';
import { DailySchedule, SchedulesService, WeeklySchedule, WeeklyScheduleReference } from '../../schedules/schedules.service';
import { GoogleSchedulesService } from '../schedules/schedules.service';
import * as moment from 'moment';
import { GoogleRunTaskFactory, RunTaskContext } from './tasks/run-task.factory';

@Injectable()
export class GoogleRunService {
    public running$: BehaviorSubject<boolean>;
    public schedule$: BehaviorSubject<WeeklySchedule>;
    public exception$: BehaviorSubject<Exception>;
    public reference$: BehaviorSubject<WeeklyScheduleReference>;

    constructor(
        private _scheduleService: SchedulesService,
        private _googleSchedulesService: GoogleSchedulesService,
        private _runTaskFactory : GoogleRunTaskFactory,
        private _router: Router) {
            this.running$ = new BehaviorSubject<boolean>(false);
            this.schedule$ = new BehaviorSubject<WeeklySchedule>(null);
            this.exception$ = new BehaviorSubject<Exception>(null);
            this.reference$ = new BehaviorSubject<WeeklyScheduleReference>(null);
    }

    start() {
        this.running$.next(true);
        const reference = this._scheduleService.getCurrent();
        this._googleSchedulesService.get(reference.begin)
            .subscribe(
                x => {
                    this.reference$.next(reference);
                    this.schedule$.next(x.schedule);
                    this.checkForEvent();
                },
                ex => {
                    this.exception$.next(ex);
                    if (ex instanceof UnauthorizedException) {
                        this._router.navigate(['/auth'], { queryParams: { r: this._router.url, m: "REAUTH_MSG" } });
                    }
                }
            );
    }

    checkForEvent() {
        if (!this.running$.value) {
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

        const nowMin = now.clone().subtract(5, 'minutes');
        const nowMax = now.clone().add(5, 'minutes');

        const events = schedule.events.filter(event => {
            const time = moment().startOf('day').add(event.time, 'minutes');

            if(nowMin.isBefore(time) && nowMax.isAfter(time)){
                return true;
            }
            return false;
        });

        var sessionStateKey = reference.begin.getTime()+".state";
        var sessionState : string[] = JSON.parse(sessionStorage.getItem(sessionStateKey) ?? "[]");

        events.forEach(e => {
            e.tasks.forEach(t =>{
                var svc = this._runTaskFactory.create(t.key);
                
                try{
                    if(sessionState.indexOf(t.uniqueId) < 0){
                        svc.execute(<RunTaskContext>{
                            weeklyScheduleRef: reference,
                            weeklySchedule: weeklySchedule,
                            dailySchedule: schedule,
                            event: e,
                            task: t
                        });
                        sessionState.push(t.uniqueId);
                    }

                }catch(e){
                    this.exception$.next(e);
                }
            });
        });
        
        sessionStorage.setItem(sessionStateKey, JSON.stringify(sessionState));

        if (this.running$.value) {
            const me = this;
            setTimeout(() => {
                me.checkForEvent();
            }, 1000 * 60);
        }
    }

    stop() {
        this.schedule$.next(null);
        this.reference$.next(null);
        this.running$.next(false);
    }
}