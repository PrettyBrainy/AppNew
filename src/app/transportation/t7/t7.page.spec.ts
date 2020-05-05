import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T7Page } from './t7.page';

describe('T7Page', () => {
  let component: T7Page;
  let fixture: ComponentFixture<T7Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T7Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
