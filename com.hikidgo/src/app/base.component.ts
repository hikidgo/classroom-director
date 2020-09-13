import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-system-root',
  templateUrl: './base.component.html',
  styleUrls: [
    './base.component.scss'
  ],
  providers: []
})

export class BaseComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  
  menuButtonDisabled = false;
  
  constructor(public translate : TranslateService) {
  }

  ngOnInit() {
  }

  lang(lang : string){
    this.translate.use(lang);
    sessionStorage.setItem('language',lang);
  }

  ngOnDestroy(): void {
    this._subs.forEach(x => x.unsubscribe());
  }

}
