import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerContratComponent } from './creer-contrat.component';

describe('CreerContratComponent', () => {
  let component: CreerContratComponent;
  let fixture: ComponentFixture<CreerContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerContratComponent]
    });
    fixture = TestBed.createComponent(CreerContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
