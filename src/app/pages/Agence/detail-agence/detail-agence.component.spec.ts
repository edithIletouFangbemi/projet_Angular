import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgenceComponent } from './detail-agence.component';

describe('DetailAgenceComponent', () => {
  let component: DetailAgenceComponent;
  let fixture: ComponentFixture<DetailAgenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAgenceComponent]
    });
    fixture = TestBed.createComponent(DetailAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
