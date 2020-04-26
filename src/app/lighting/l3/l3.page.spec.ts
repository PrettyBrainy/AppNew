import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { L3Page } from './l3.page';

describe('L3Page', () => {
  let component: L3Page;
  let fixture: ComponentFixture<L3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
