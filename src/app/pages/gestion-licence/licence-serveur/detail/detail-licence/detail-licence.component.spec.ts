import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLicenceComponent } from './detail-licence.component';

describe('DetailLicenceComponent', () => {
  let component: DetailLicenceComponent;
  let fixture: ComponentFixture<DetailLicenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailLicenceComponent]
    });
    fixture = TestBed.createComponent(DetailLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
