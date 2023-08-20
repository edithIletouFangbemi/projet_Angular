import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceServeurComponent } from './licence-serveur.component';

describe('LicenceServeurComponent', () => {
  let component: LicenceServeurComponent;
  let fixture: ComponentFixture<LicenceServeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceServeurComponent]
    });
    fixture = TestBed.createComponent(LicenceServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
