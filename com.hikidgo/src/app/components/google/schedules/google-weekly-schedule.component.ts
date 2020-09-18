import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserManagerProviderType, UserStateFactory } from 'src/app/services/authentication/user-state.factory';
import { UserContext } from 'src/app/services/authentication/user-state.service';
import { DailySchedule, ScheduleEvent, WeeklySchedule } from 'src/app/services/schedules/schedules.service';
import { GoogleFileRef, GoogleSchedulesService } from 'src/app/services/google/schedules/schedules.service';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-google-weekly-schedule',
  templateUrl: './google-weekly-schedule.component.html',
  styleUrls: ['./google-weekly-schedule.component.scss'],
  providers: []
})

export class GoogleWeeklyScheduleComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  userContext: UserContext = null;

  exception: Exception;
  savingException: Exception;
  refreshing : boolean = false;
  saving : boolean = false;

  begin : Date;
  schedule : WeeklySchedule = null;
  days : DailySchedule[] = null;
  ref : GoogleFileRef = null;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _titleService: TitleService,
    private _userStateFactory: UserStateFactory,
    private _translate: TranslateService,
    private _svc : GoogleSchedulesService) { 

      this._route.params.forEach((params: Params) => {
        this.begin =new Date(parseInt(params['begin']));
      });

      var userStateService = this._userStateFactory.create(UserManagerProviderType.Google);
  
      var sub = userStateService.userContext$.subscribe(x => {
        this.userContext = x;
      });
  
      this._subs.push(sub);
  
    }

  ngOnInit() {
    const subTitle = this._translate.get('SCHEDULES').subscribe(x => {
        this._titleService.setTitle(`${x}`);
    });
    this._subs.push(subTitle);

    this.refresh();

    const subTranslate = this._translate.get('SPEAK', {name: this.userContext.user.profile.given_name}).subscribe((res: string) => {
        var msg = new SpeechSynthesisUtterance();
        msg.lang = this._translate.currentLang;
        msg.text = res;
        window.speechSynthesis.speak(msg);
    });
    this._subs.push(subTranslate);
  }
  
  refresh() {

    this.exception = null;
    this.refreshing = true;

    this._svc.get(this.begin)
      .subscribe(
        x => {

          x.schedule.monday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 510,
            title: "Class Meeting (Live)",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for your morning meeting!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.tuesday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 510,
            title: "Class Meeting (Live)",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for your morning meeting!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.wednesday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 510,
            title: "Class Meeting (Live)",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for your morning meeting!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.thursday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 510,
            title: "Class Meeting (Live)",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for your morning meeting!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.friday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 510,
            title: "Class Meeting (Live)",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for your morning meeting!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.monday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 540,
            title: "Phonics",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for phonics live!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.tuesday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 540,
            title: "Phonics",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for phonics live!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.wednesday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 540,
            title: "Phonics",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for phonics live!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.thursday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 540,
            title: "Phonics",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for phonics live!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });
          x.schedule.friday.events.push(<ScheduleEvent>{
            uniqueId: uuidv4(),
            time: 540,
            title: "Phonics",
            tasks: [
              { uniqueId: uuidv4(), title: "Speak", key: "speak", configuration: JSON.stringify({ text: "It's time for phonics live!" }) },
              { uniqueId: uuidv4(), title: "Launch", key: "launchUrl", configuration: JSON.stringify({ url: "https://www.google.com" }) }
            ]
          });

          this.ref = x.ref;
          this.schedule = x.schedule;
          this.refreshing = false;
        },
        ex => {
          this.exception = ex;
          this.refreshing = false;
          if (ex instanceof UnauthorizedException) {
            this._router.navigate(['/auth'], { queryParams: { r: this._router.url, m: "REAUTH_MSG" } });
          }
        }
      );
  }

  save(){
    if(this.saving){
      return;
    }

    this.savingException = null;
    this.saving = true;

    this._svc.update({
      schedule: this.schedule,
      ref: this.ref
    })
    .subscribe(
      x => {
        this.saving = false;
        this.ref = x.ref;
        this.refresh();
      },
      ex => {
        this.savingException = ex;
        this.saving = false;
        if (ex instanceof UnauthorizedException) {
          this._router.navigate(['/auth'], { queryParams: { r: this._router.url, m: "REAUTH_MSG" } });
        }
      }
    );
  }

  ngOnDestroy() {
    this._subs.forEach(x => x.unsubscribe());
  }

}
