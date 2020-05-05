import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T9Page } from './t9.page';

describe('T9Page', () => {
  let component: T9Page;
  let fixture: ComponentFixture<T9Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T9Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T9Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
