import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ar5Page } from './ar5.page';

describe('Ar5Page', () => {
  let component: Ar5Page;
  let fixture: ComponentFixture<Ar5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ar5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ar5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
