import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {

    constructor(private _translate : TranslateService){
        
    }

    transform(value: number, dateFormat: string): any {
        if(value != null){
            return moment().startOf('day').add(value, 'minutes').locale(this._translate.currentLang).format(dateFormat);
        }
        return '';
    }
}