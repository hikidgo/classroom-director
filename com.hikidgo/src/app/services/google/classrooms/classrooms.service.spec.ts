/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleClassroomsService } from './classrooms.service';

describe('Service: GoogleClassroomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleClassroomsService]
    });
  });

  it('should ...', inject([GoogleClassroomsService], (service: GoogleClassroomsService) => {
    expect(service).toBeTruthy();
  }));
});
