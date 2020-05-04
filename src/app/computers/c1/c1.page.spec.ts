import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C1Page } from './c1.page';

describe('C1Page', () => {
  let component: C1Page;
  let fixture: ComponentFixture<C1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
