import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T3Page } from './t3.page';

describe('T3Page', () => {
  let component: T3Page;
  let fixture: ComponentFixture<T3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
