import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserManager } from 'oidc-client';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserManagerProviderType, UserStateFactory } from 'src/app/services/authentication/user-state.factory';
import { UserContext } from 'src/app/services/authentication/user-state.service';
import { SchedulesService } from 'src/app/services/schedules/schedules.service';

@Component({
  selector: 'app-google-schedules',
  templateUrl: './google-schedules.component.html',
  styleUrls: ['./google-schedules.component.scss'],
  providers: []
})

export class GoogleSchedulesComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  userContext: UserContext = null;


  constructor(
    private _titleService: TitleService,
    private _userStateFactory: UserStateFactory,
    private _translate: TranslateService,
    private _schedulesService: SchedulesService) { 

      var userStateService = this._userStateFactory.create(UserManagerProviderType.Google);
      userStateService.init();
  
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

    var schedules = this._schedulesService.getUpcoming();

  }


  ngOnDestroy() {
    this._subs.forEach(x => x.unsubscribe());
  }

}
