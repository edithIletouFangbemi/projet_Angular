import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContratComponent } from './gestion-contrat.component';

describe('GestionContratComponent', () => {
  let component: GestionContratComponent;
  let fixture: ComponentFixture<GestionContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionContratComponent]
    });
    fixture = TestBed.createComponent(GestionContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
