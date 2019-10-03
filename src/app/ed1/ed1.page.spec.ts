import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed1Page } from './ed1.page';

describe('Ed1Page', () => {
  let component: Ed1Page;
  let fixture: ComponentFixture<Ed1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
