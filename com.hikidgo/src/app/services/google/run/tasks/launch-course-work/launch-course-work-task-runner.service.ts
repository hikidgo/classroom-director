import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GoogleCourseWorkService } from '../../../course-work/course-work.service';
import { GoogleCourseWork } from '../../../data';
import { GoogleTaskRunnerService, RunTaskContext } from '../run-task.factory';

@Injectable()
export class GoogleLaunchCourseWorkTaskRunnerService implements GoogleTaskRunnerService {

    constructor(private _googleCourseWorkService: GoogleCourseWorkService,
      private _translate : TranslateService) {

    }

    async execute(context: RunTaskContext) : Promise<boolean>{
      const config = <LaunchCourseWorkTaskConfiguration>JSON.parse(context.task.configuration);
     
      var x = await this._googleCourseWorkService.getAll(config.courseId).toPromise();
      
      var courseWork : GoogleCourseWork;
            
      if(config.courseWorkId != null && config.courseWorkId != ''){
        courseWork = x.courseWork.find(x => x.id == config.courseWorkId);
      }else if(config.courseWorkTopicId && config.courseWorkTopicId != ''){
        courseWork = x.courseWork.find(x => x.topicId == config.courseWorkTopicId);
      }
      else if(x.courseWork.length > 0){
        courseWork = x.courseWork[0];
      }

      if(courseWork == null){
        return false;
      }

      window.open(courseWork.alternateLink, '_blank');

      if(config.isSpeakDescription){
        const msg = new SpeechSynthesisUtterance();
        msg.lang = this._translate.currentLang;
        msg.text = courseWork.description;
        window.speechSynthesis.speak(msg);
      }
      return true;
    }
}

export interface LaunchCourseWorkTaskConfiguration {
  courseId: string;
  courseWorkId: string;
  courseWorkTopicId : string;
  isSpeakDescription: string;
}
