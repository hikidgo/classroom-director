import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class SchedulesService {

    constructor() { }

    getUpcoming(): WeeklyScheduleReference[] {
        var weeks : WeeklyScheduleReference[] = [];
        var today = moment().startOf('day');

        while(today.day() != 0){
            today.subtract(1, 'days');
        }

        for(var i = 0; i < 5; i++){
            weeks.push(<WeeklyScheduleReference>{
                begin : today.toDate()
            });
            today.add(7, 'days');
        }

        return weeks;
    }
}

export class WeeklyScheduleReference {
    begin : Date;
}

export class WeeklySchedule{

    constructor(begin?:Date){
        this.version = 0;
        this.begin = begin;
        this.sunday = new DailySchedule();
        this.monday = new DailySchedule();
        this.tuesday = new DailySchedule();
        this.wednesday = new DailySchedule();
        this.thursday = new DailySchedule();
        this.friday = new DailySchedule();
        this.saturday = new DailySchedule();
    }

    begin : Date;
    version: number;
    sunday: DailySchedule;
    monday: DailySchedule;
    tuesday: DailySchedule;
    wednesday: DailySchedule;
    thursday: DailySchedule;
    friday: DailySchedule;
    saturday: DailySchedule;
}

export class DailySchedule{
    constructor(){
        this.events = [];
    }
    events : ScheduleEvent[];
}

export class ScheduleEvent{
    constructor(){
        this.tasks = [];
    }
    
    uniqueId : string;
    time : number;
    title : string;
    tasks : ScheduleEventTask[];
}

export class ScheduleEventTask{
    uniqueId : string;
    key : string;
    configuration : string;
}
