import { TestBed } from '@angular/core/testing';

import { ContratInstitutionServiceService } from './contrat-institution-service.service';

describe('ContratInstitutionServiceService', () => {
  let service: ContratInstitutionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratInstitutionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
