import { TestBed } from '@angular/core/testing';

import { LicenceServeurService } from './licence-serveur.service';

describe('LicenceServeurService', () => {
  let service: LicenceServeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenceServeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
