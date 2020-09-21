import { Injectable } from '@angular/core';
import { DailySchedule, ScheduleEvent, ScheduleEventTask, WeeklySchedule, WeeklyScheduleReference } from '../../../schedules/schedules.service';
import { GoogleSpeakTaskRunnerService } from './speak/speak-task-runner.service';

@Injectable()
export class GoogleRunTaskFactory {
    constructor(private _speakTaskRunnerService : GoogleSpeakTaskRunnerService){

    }

    create(key : string) : GoogleTaskRunnerService{

    switch (key) {
        case "speak":
          return this._speakTaskRunnerService;
          break;
        // case "launchUrl":
        //   component = LaunchUrlTaskEditorComponent;
        //   break;
        // case "launchCourseWork":
        //   component = LaunchCourseWorkTaskEditorComponent;
        //   break;
        // case "launchCourseVideo":
        //   component = LaunchCourseMeetTaskEditorComponent;
        //   break;
      }
    }
}

export interface GoogleTaskRunnerService{
    execute(context: RunTaskContext);
}

export class RunTaskContext{
    weeklyScheduleRef : WeeklyScheduleReference;
    weeklySchedule : WeeklySchedule;
    dailySchedule : DailySchedule;
    event : ScheduleEvent;
    task : ScheduleEventTask;
}
