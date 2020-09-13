/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserStateService } from './user-state.service';

describe('Service: Activities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStateService]
    });
  });

  it('should ...', inject([UserStateService], (service: UserStateService) => {
    expect(service).toBeTruthy();
  }));
});
