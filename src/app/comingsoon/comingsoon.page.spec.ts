import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingsoonPage } from './comingsoon.page';

describe('ComingsoonPage', () => {
  let component: ComingsoonPage;
  let fixture: ComponentFixture<ComingsoonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComingsoonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingsoonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
