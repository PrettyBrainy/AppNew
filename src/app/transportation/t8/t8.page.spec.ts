import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T8Page } from './t8.page';

describe('T8Page', () => {
  let component: T8Page;
  let fixture: ComponentFixture<T8Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T8Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T8Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
