import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed2Page } from './ed2.page';

describe('Ed2Page', () => {
  let component: Ed2Page;
  let fixture: ComponentFixture<Ed2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
