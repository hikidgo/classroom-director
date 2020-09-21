import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTaskRunnerService, RunTaskContext } from '../../tasks/run-task.factory';

@Injectable()
export class GoogleSpeakTaskRunnerService implements GoogleTaskRunnerService {

    constructor(private _translate: TranslateService) {

    }

    async execute(context: RunTaskContext) : Promise<boolean> {
        const config = <SpeakTaskConfiguration>JSON.parse(context.task.configuration);
        const msg = new SpeechSynthesisUtterance();
        msg.lang = this._translate.currentLang;
        msg.text = config.text;
        window.speechSynthesis.speak(msg);
        return true;
    }
}

export interface SpeakTaskConfiguration {
  text: string;
}