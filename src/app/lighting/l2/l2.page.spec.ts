import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { L2Page } from './l2.page';

describe('L2Page', () => {
  let component: L2Page;
  let fixture: ComponentFixture<L2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
