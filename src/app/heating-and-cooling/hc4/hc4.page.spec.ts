import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc4Page } from './hc4.page';

describe('Hc4Page', () => {
  let component: Hc4Page;
  let fixture: ComponentFixture<Hc4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
