import { TestBed } from '@angular/core/testing';

import { DureeVieService } from './duree-vie.service';

describe('DureeVieService', () => {
  let service: DureeVieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DureeVieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
