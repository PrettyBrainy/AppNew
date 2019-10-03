import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Welcome1Page } from './welcome1.page';

describe('Welcome1Page', () => {
  let component: Welcome1Page;
  let fixture: ComponentFixture<Welcome1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Welcome1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Welcome1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
