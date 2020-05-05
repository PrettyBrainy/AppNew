import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc1Page } from './hc1.page';

describe('Hc1Page', () => {
  let component: Hc1Page;
  let fixture: ComponentFixture<Hc1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
