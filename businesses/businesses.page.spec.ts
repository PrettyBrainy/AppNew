import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessesPage } from './businesses.page';

describe('BusinessesPage', () => {
  let component: BusinessesPage;
  let fixture: ComponentFixture<BusinessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
