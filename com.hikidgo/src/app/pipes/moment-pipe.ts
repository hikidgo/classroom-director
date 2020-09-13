import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {

    constructor(private _translate : TranslateService){
        
    }

    transform(value: any | moment.Moment, dateFormat: string): any {
        if(value != null && value != ''){
            return moment.utc(value).local().locale(this._translate.currentLang).format(dateFormat);
        }
        return '';
    }
}