/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleCourseWorkService } from './course-work.service';

describe('Service: GoogleAssignmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCourseWorkService]
    });
  });

  it('should ...', inject([GoogleCourseWorkService], (service: GoogleCourseWorkService) => {
    expect(service).toBeTruthy();
  }));
});
