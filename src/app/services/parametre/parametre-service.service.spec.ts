import { TestBed } from '@angular/core/testing';

import { ParametreServiceService } from './parametre-service.service';

describe('ParametreServiceService', () => {
  let service: ParametreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
