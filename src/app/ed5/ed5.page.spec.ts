import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed5Page } from './ed5.page';

describe('Ed5Page', () => {
  let component: Ed5Page;
  let fixture: ComponentFixture<Ed5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
