/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleSchedulesService } from './schedules.service';

describe('Service: GoogleSchedulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleSchedulesService]
    });
  });

  it('should ...', inject([GoogleSchedulesService], (service: GoogleSchedulesService) => {
    expect(service).toBeTruthy();
  }));
});
