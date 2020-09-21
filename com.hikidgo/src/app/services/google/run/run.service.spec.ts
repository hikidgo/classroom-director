/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleRunService } from './run.service';

describe('Service: GoogleRunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleRunService]
    });
  });

  it('should ...', inject([GoogleRunService], (service: GoogleRunService) => {
    expect(service).toBeTruthy();
  }));
});
