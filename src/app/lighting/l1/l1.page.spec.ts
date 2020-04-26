import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { L1Page } from './l1.page';

describe('L1Page', () => {
  let component: L1Page;
  let fixture: ComponentFixture<L1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
