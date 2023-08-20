import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererLicenceServeurComponent } from './generer-licence-serveur.component';

describe('GenererLicenceServeurComponent', () => {
  let component: GenererLicenceServeurComponent;
  let fixture: ComponentFixture<GenererLicenceServeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenererLicenceServeurComponent]
    });
    fixture = TestBed.createComponent(GenererLicenceServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
