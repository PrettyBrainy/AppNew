import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pl4Page } from './pl4.page';

describe('Pl4Page', () => {
  let component: Pl4Page;
  let fixture: ComponentFixture<Pl4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pl4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pl4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
