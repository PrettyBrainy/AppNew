import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed3Page } from './ed3.page';

describe('Ed3Page', () => {
  let component: Ed3Page;
  let fixture: ComponentFixture<Ed3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
