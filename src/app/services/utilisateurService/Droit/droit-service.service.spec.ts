import { TestBed } from '@angular/core/testing';

import { DroitServiceService } from './droit-service.service';

describe('DroitServiceService', () => {
  let service: DroitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
