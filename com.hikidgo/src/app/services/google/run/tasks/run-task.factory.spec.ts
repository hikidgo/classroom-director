/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleRunTaskFactory } from './run-task.factory';

describe('Service: GoogleRunTaskFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleRunTaskFactory]
    });
  });

  it('should ...', inject([GoogleRunTaskFactory], (service: GoogleRunTaskFactory) => {
    expect(service).toBeTruthy();
  }));
});
