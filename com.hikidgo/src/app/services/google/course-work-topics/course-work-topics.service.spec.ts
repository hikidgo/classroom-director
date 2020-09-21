/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleCourseWorkTopicsService } from './course-work-topics.service';

describe('Service: GoogleCourseWorkTopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCourseWorkTopicsService]
    });
  });

  it('should ...', inject([GoogleCourseWorkTopicsService], (service: GoogleCourseWorkTopicsService) => {
    expect(service).toBeTruthy();
  }));
});
