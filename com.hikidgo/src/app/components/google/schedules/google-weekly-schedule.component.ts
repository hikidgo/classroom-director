import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserManagerProviderType, UserStateFactory } from 'src/app/services/authentication/user-state.factory';
import { UserContext } from 'src/app/services/authentication/user-state.service';
import { WeeklySchedule } from 'src/app/services/schedules/schedules.service';
import { GoogleFileRef, GoogleSchedulesService } from 'src/app/services/google/schedules/schedules.service';
import { Exception, UnauthorizedException } from 'src/app/interceptors/http-interceptor.service';

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
  }
  
  refresh() {

    this.exception = null;
    this.refreshing = true;

    this._svc.get(this.begin)
      .subscribe(
        x => {
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
