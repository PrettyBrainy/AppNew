import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingAndCoolingPage } from './heating-and-cooling.page';

describe('HeatingAndCoolingPage', () => {
  let component: HeatingAndCoolingPage;
  let fixture: ComponentFixture<HeatingAndCoolingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatingAndCoolingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatingAndCoolingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
