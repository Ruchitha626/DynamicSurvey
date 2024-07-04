import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsurveyComponent } from './addsurvey.component';

describe('AddsurveyComponent', () => {
  let component: AddsurveyComponent;
  let fixture: ComponentFixture<AddsurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsurveyComponent]
    });
    fixture = TestBed.createComponent(AddsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
