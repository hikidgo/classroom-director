import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TitleService {

    public title : string = 'Home';

    public constructor(private _title : Title, private _meta : Meta, private _translate : TranslateService) { }

    public setTitle(newTitle: string) {
        this.title = newTitle;
        const sub = this._translate.get('APPNAME').subscribe(x => {
            this._title.setTitle(`${x} - ${newTitle}`);
        });

        setTimeout(function(){
            sub.unsubscribe();
        },500);
    }
}
