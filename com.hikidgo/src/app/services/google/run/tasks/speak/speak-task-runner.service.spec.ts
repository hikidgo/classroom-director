/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleSpeakTaskRunnerService } from './speak-task-runner.service';

describe('Service: GoogleSpeakTaskRunnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleSpeakTaskRunnerService]
    });
  });

  it('should ...', inject([GoogleSpeakTaskRunnerService], (service: GoogleSpeakTaskRunnerService) => {
    expect(service).toBeTruthy();
  }));
});
