import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pl1Page } from './pl1.page';

describe('Pl1Page', () => {
  let component: Pl1Page;
  let fixture: ComponentFixture<Pl1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pl1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pl1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
