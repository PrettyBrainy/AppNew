import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pl2Page } from './pl2.page';

describe('Pl2Page', () => {
  let component: Pl2Page;
  let fixture: ComponentFixture<Pl2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pl2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pl2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
