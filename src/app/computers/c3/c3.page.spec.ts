import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C3Page } from './c3.page';

describe('C3Page', () => {
  let component: C3Page;
  let fixture: ComponentFixture<C3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
