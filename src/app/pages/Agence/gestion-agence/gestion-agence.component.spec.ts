import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgenceComponent } from './gestion-agence.component';

describe('GestionAgenceComponent', () => {
  let component: GestionAgenceComponent;
  let fixture: ComponentFixture<GestionAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAgenceComponent]
    });
    fixture = TestBed.createComponent(GestionAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
