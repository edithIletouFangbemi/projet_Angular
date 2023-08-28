import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPosteComponent } from './detail-poste.component';

describe('DetailPosteComponent', () => {
  let component: DetailPosteComponent;
  let fixture: ComponentFixture<DetailPosteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPosteComponent]
    });
    fixture = TestBed.createComponent(DetailPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
