import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSchoolAuthCheckPage } from './middle-school-auth-check.page';

describe('MiddleSchoolAuthCheckPage', () => {
  let component: MiddleSchoolAuthCheckPage;
  let fixture: ComponentFixture<MiddleSchoolAuthCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleSchoolAuthCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleSchoolAuthCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
