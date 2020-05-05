import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T6Page } from './t6.page';

describe('T6Page', () => {
  let component: T6Page;
  let fixture: ComponentFixture<T6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
