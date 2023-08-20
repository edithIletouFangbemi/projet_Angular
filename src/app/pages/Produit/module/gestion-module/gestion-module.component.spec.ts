import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModuleComponent } from './gestion-module.component';

describe('GestionModuleComponent', () => {
  let component: GestionModuleComponent;
  let fixture: ComponentFixture<GestionModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionModuleComponent]
    });
    fixture = TestBed.createComponent(GestionModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
