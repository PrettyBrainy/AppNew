import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc2Page } from './hc2.page';

describe('Hc2Page', () => {
  let component: Hc2Page;
  let fixture: ComponentFixture<Hc2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
