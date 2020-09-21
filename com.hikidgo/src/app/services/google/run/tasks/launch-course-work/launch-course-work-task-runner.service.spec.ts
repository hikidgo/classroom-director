/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleLaunchCourseWorkTaskRunnerService } from './launch-course-work-task-runner.service';

describe('Service: GoogleLaunchCourseWorkTaskRunnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleLaunchCourseWorkTaskRunnerService]
    });
  });

  it('should ...', inject([GoogleLaunchCourseWorkTaskRunnerService], (service: GoogleLaunchCourseWorkTaskRunnerService) => {
    expect(service).toBeTruthy();
  }));
});
