import { TestBed } from '@angular/core/testing';

import { DynamicScriptLoaderService3Service } from './dynamic-script-loader-service3.service';

describe('DynamicScriptLoaderService3Service', () => {
  let service: DynamicScriptLoaderService3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicScriptLoaderService3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
