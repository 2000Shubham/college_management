import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestudentPageComponent } from './updatestudent-page.component';

describe('UpdatestudentPageComponent', () => {
  let component: UpdatestudentPageComponent;
  let fixture: ComponentFixture<UpdatestudentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatestudentPageComponent]
    });
    fixture = TestBed.createComponent(UpdatestudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
