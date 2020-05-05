import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T4Page } from './t4.page';

describe('T4Page', () => {
  let component: T4Page;
  let fixture: ComponentFixture<T4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
