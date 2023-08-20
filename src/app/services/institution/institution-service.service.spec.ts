import { TestBed } from '@angular/core/testing';

import { InstitutionServiceService } from './institution-service.service';

describe('InstitutionServiceService', () => {
  let service: InstitutionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
