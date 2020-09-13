import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { UserManager, User } from 'oidc-client';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/authentication/user-state.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserManagerProviderType, UserStateFactory } from 'src/app/services/authentication/user-state.factory';


@Component({
  selector: 'app-google-auth-callback',
  templateUrl: './google-auth-callback.component.html',
  styleUrls: ['./google-auth-callback.component.scss'],
  providers: []
})

export class GoogleAuthCallbackComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  user : User = null;

  constructor(
    private _titleService: TitleService,
    private _userStateFactory : UserStateFactory,
    private _router : Router,
    private _translate : TranslateService) { }

  ngOnInit() {
    const subTitle = this._translate.get('AUTHENTICATING').subscribe(x => {
        this._titleService.setTitle(`${x}`);
    });
    this._subs.push(subTitle);

    var me = this;
    this._userStateFactory.create(UserManagerProviderType.Google).signinRedirectCallback()
      .then(x => {
        me.user = x;
        me._router.navigateByUrl(x.state);
      });
  }

  ngOnDestroy() {
    this._subs.forEach(x => x.unsubscribe());
  }
}
