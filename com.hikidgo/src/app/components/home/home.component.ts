import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { UserStateService, UserContext } from 'src/app/services/authentication/user-state.service';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})

export class HomeComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  
  userContext : UserContext;

  constructor(private _titleService: TitleService,
    private _translate : TranslateService) {

      
  }

  ngOnInit() {
    const subTitle = this._translate.get('SELECT_CLASSROOM_PROVIDER').subscribe(x => {
        this._titleService.setTitle(`${x}`);
    });
    this._subs.push(subTitle);
  }


  ngOnDestroy(): void {
    this._subs.forEach(x => x.unsubscribe());
  }

}
