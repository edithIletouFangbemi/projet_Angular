import { TestBed } from '@angular/core/testing';

import { LicenceClienteServiceService } from './licence-cliente-service.service';

describe('LicenceClienteServiceService', () => {
  let service: LicenceClienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenceClienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
