import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { UserManager } from 'oidc-client';
import { MatSidenav } from '@angular/material/sidenav';
import { UserStateService, UserContext } from './services/authentication/user-state.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserManagerProviderType, UserStateFactory } from './services/authentication/user-state.factory';
import { GoogleRunService } from './services/google/run/run.service';


@Component({
  selector: 'app-google-root',
  templateUrl: './google.component.html',
  styleUrls: [
    './base.component.scss'
  ],
  providers: []
})

export class GoogleComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _userStateService : UserStateService;
  @ViewChild("start", { static: true }) start: MatSidenav;

  userContext: UserContext = null;

  opened: boolean = false;
  sidenavOpened = null;
  sidenavMode = 'side';
  menuButtonDisabled = false;
  private _window: Window;

  constructor(
    private _ngZone: NgZone,
    private _userStateFactory: UserStateFactory,
    public translate : TranslateService,
    private _runService: GoogleRunService) {

    this._userStateService = this._userStateFactory.create(UserManagerProviderType.Google);
    this._userStateService.init();

    this._window = window;
    /* */
    this._window.onresize = (e) => {
      this.checkMenu();
    };

    var sub = this._userStateService.userContext$.subscribe(x => {
      this.userContext = x;
    });

    this._subs.push(sub);

  }

  ngOnInit() {
    this.checkMenu();
    this._runService.start();
  }

  lang(lang : string){
    this.translate.use(lang);
    sessionStorage.setItem('language',lang);
  }

  checkMenu() {
    var w = this._window.innerWidth;

    try {
      if (w > 768) {
        if (this.sidenavOpened != true) {
          this._ngZone.run(() => {
            this.sidenavOpened = true;
            this.start.open();
            this.sidenavMode = 'side';
            this.menuButtonDisabled = true;
          });
        }
      } else {
        if (this.sidenavOpened != false) {
          this._ngZone.run(() => {
            this.sidenavOpened = false;
            this.start.close();
            this.sidenavMode = 'over';
            this.menuButtonDisabled = false;
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  openSidenav() {
    this.start.open();
  }

  closeSidenav() {
    if (this.sidenavMode == 'over') {
      this.start.close();
    }
  }

  signout() {
    this._userStateService.signoutRedirect(this.translate.currentLang);
  }

  ngOnDestroy(): void {
    this._runService.stop();
    this._subs.forEach(x => x.unsubscribe());
  }

}
