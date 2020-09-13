import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class SchedulesService {

    constructor() { }

    getUpcoming(): WeeklyScheduleReference[] {
        var weeks : WeeklyScheduleReference[] = [];
        var today = moment().utc().startOf('day');

        while(today.day() != 0){
            today = today.subtract(1, 'days');
        }

        for(var i = 0; i < 5; i++){
            weeks.push(<WeeklyScheduleReference>{
                begin : today.toDate(),
                end: today.add(6, 'days').toDate()
            });
        }

        return weeks;
    }
}

export class WeeklyScheduleReference {
    begin : Date;
    end : Date;
}

export class WeeklySchedule{
    begin : Date;
    sunday: DailySchedule;
    monday: DailySchedule;
    tuesday: DailySchedule;
    wednesday: DailySchedule;
    thursday: DailySchedule;
    friday: DailySchedule;
    saturday: DailySchedule;
}

export class DailySchedule{
    assignments : Assignment[];
}

export class Assignment{
    time : number;
    tasks : Task[];
}

export class Task{
    key : string;
    configuration : string;
}
