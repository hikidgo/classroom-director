import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTaskRunnerService, RunTaskContext } from '../../tasks/run-task.factory';

@Injectable()
export class GoogleSpeakTaskRunnerService implements GoogleTaskRunnerService {

    constructor(private _translate: TranslateService) {

    }

    execute(context: RunTaskContext) {
        const config = <SpeakTaskConfiguration>JSON.parse(context.task.configuration);
        const msg = new SpeechSynthesisUtterance();
        msg.lang = this._translate.currentLang;
        msg.text = config.text;
        window.speechSynthesis.speak(msg);
    }
}

export interface SpeakTaskConfiguration {
  text: string;
}