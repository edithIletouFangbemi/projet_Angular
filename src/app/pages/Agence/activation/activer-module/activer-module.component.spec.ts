import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiverModuleComponent } from './activer-module.component';

describe('ActiverModuleComponent', () => {
  let component: ActiverModuleComponent;
  let fixture: ComponentFixture<ActiverModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiverModuleComponent]
    });
    fixture = TestBed.createComponent(ActiverModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
