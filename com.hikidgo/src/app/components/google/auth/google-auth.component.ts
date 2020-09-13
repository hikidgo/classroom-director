import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserManagerProviderType, UserStateFactory } from 'src/app/services/authentication/user-state.factory';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
  providers: []
})

export class GoogleAuthComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  action: string = null;
  code: string = null;
  token: string = null;
  email: string = null;
  redirectUrl: string = null;
  authMessage: string = null;
  errorMessage: string = null;
  pickingLang: boolean = null;

  constructor(
    private _titleService: TitleService,
    private _route: ActivatedRoute,
    private _userStateFactory: UserStateFactory,
    private _translate: TranslateService) { }

  ngOnInit() {
    const subTitle = this._translate.get('AUTHENTICATING').subscribe(x => {
      this._titleService.setTitle(`${x}`);
    });
    this._subs.push(subTitle);

    this._route.queryParams.forEach((params: Params) => {
      this.authMessage = params['m'];
      this.authMessage = this.authMessage != null ? decodeURI(this.authMessage) : null;
      this.redirectUrl = params['r'];
      this.redirectUrl = this.redirectUrl != null ? decodeURI(this.redirectUrl) : null;
    });

    this.redirect();
  }

  redirect() {
    this.errorMessage = null;
    var me = this;

    this._userStateFactory.create(UserManagerProviderType.Google)
      .signinRedirect(this.redirectUrl, this._translate.currentLang)
      .catch(function (e) {
        me.errorMessage = e.message;
      });

  }

  ngOnDestroy() {
    this._subs.forEach(x => x.unsubscribe());
  }

}
