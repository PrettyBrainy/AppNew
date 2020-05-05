import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc3Page } from './hc3.page';

describe('Hc3Page', () => {
  let component: Hc3Page;
  let fixture: ComponentFixture<Hc3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
