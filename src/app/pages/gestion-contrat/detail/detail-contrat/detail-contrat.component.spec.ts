import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContratComponent } from './detail-contrat.component';

describe('DetailContratComponent', () => {
  let component: DetailContratComponent;
  let fixture: ComponentFixture<DetailContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailContratComponent]
    });
    fixture = TestBed.createComponent(DetailContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
