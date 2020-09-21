import { Injectable } from '@angular/core';
import { DailySchedule, ScheduleEvent, ScheduleEventTask, WeeklySchedule, WeeklyScheduleReference } from '../../../schedules/schedules.service';
import { GoogleLaunchCourseWorkTaskRunnerService } from './launch-course-work/launch-course-work-task-runner.service';
import { GoogleLaunchUrlTaskRunnerService } from './launch-url/launch-url-task-runner.service';
import { GoogleSpeakTaskRunnerService } from './speak/speak-task-runner.service';

@Injectable()
export class GoogleRunTaskFactory {
    constructor(private _speakTaskRunnerService : GoogleSpeakTaskRunnerService,
        private _launchUrlTaskRunnerService: GoogleLaunchUrlTaskRunnerService,
        private _launchCourseWorkRunnerService: GoogleLaunchCourseWorkTaskRunnerService){

    }

    create(key : string) : GoogleTaskRunnerService{

    switch (key) {
        case "speak":
          return this._speakTaskRunnerService;
          break;
        case "launchUrl":
          return this._launchUrlTaskRunnerService;
          break;
        case "launchCourseWork":
          return this._launchCourseWorkRunnerService;
          break;
        // case "launchCourseVideo":
        //   component = LaunchCourseMeetTaskEditorComponent;
        //   break;
      }
    }
}

export interface GoogleTaskRunnerService{
    execute(context: RunTaskContext) : Promise<boolean>;
}

export class RunTaskContext{
    weeklyScheduleRef : WeeklyScheduleReference;
    weeklySchedule : WeeklySchedule;
    dailySchedule : DailySchedule;
    event : ScheduleEvent;
    task : ScheduleEventTask;
}
