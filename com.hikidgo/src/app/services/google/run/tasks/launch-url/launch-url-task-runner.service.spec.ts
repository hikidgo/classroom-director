/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleLaunchUrlTaskRunnerService } from './launch-url-task-runner.service';

describe('Service: GoogleLaunchUrlTaskRunnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleLaunchUrlTaskRunnerService]
    });
  });

  it('should ...', inject([GoogleLaunchUrlTaskRunnerService], (service: GoogleLaunchUrlTaskRunnerService) => {
    expect(service).toBeTruthy();
  }));
});
