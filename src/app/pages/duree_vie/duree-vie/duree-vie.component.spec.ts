import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DureeVieComponent } from './duree-vie.component';

describe('DureeVieComponent', () => {
  let component: DureeVieComponent;
  let fixture: ComponentFixture<DureeVieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DureeVieComponent]
    });
    fixture = TestBed.createComponent(DureeVieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
