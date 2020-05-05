import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc5Page } from './hc5.page';

describe('Hc5Page', () => {
  let component: Hc5Page;
  let fixture: ComponentFixture<Hc5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
