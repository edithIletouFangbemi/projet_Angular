import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceClienteComponent } from './licence-cliente.component';

describe('LicenceClienteComponent', () => {
  let component: LicenceClienteComponent;
  let fixture: ComponentFixture<LicenceClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceClienteComponent]
    });
    fixture = TestBed.createComponent(LicenceClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
