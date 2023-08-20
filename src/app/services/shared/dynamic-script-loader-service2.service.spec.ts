import { TestBed } from '@angular/core/testing';

import { DynamicScriptLoaderService2Service } from './dynamic-script-loader-service2.service';

describe('DynamicScriptLoaderService2Service', () => {
  let service: DynamicScriptLoaderService2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicScriptLoaderService2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
