import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleGuardedRouteService } from './google-guarded-route.service';

describe('Service: GoogleGuardedRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleGuardedRouteService]
    });
  });

  it('should ...', inject([GoogleGuardedRouteService], (service: GoogleGuardedRouteService) => {
    expect(service).toBeTruthy();
  }));
});
