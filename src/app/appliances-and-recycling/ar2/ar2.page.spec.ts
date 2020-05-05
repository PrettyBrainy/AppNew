import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ar2Page } from './ar2.page';

describe('Ar2Page', () => {
  let component: Ar2Page;
  let fixture: ComponentFixture<Ar2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ar2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ar2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
