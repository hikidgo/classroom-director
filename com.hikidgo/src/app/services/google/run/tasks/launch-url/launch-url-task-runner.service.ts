import { Injectable } from '@angular/core';
import { GoogleTaskRunnerService, RunTaskContext } from '../run-task.factory';

@Injectable()
export class GoogleLaunchUrlTaskRunnerService implements GoogleTaskRunnerService {

    constructor() {

    }

    async execute(context: RunTaskContext) : Promise<boolean> {
      const config = <LaunchUrlTaskConfiguration>JSON.parse(context.task.configuration);
      window.open(config.url, "_blank");
      return true;
    }
}

export interface LaunchUrlTaskConfiguration {
  url: string;
}