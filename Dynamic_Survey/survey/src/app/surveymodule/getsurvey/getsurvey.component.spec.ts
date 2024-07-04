import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsurveyComponent } from './getsurvey.component';

describe('GetsurveyComponent', () => {
  let component: GetsurveyComponent;
  let fixture: ComponentFixture<GetsurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetsurveyComponent]
    });
    fixture = TestBed.createComponent(GetsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
