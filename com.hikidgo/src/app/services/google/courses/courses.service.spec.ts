/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleCoursesService } from './courses.service';

describe('Service: GoogleCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCoursesService]
    });
  });

  it('should ...', inject([GoogleCoursesService], (service: GoogleCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
