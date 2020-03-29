import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pl5Page } from './pl5.page';

describe('Pl5Page', () => {
  let component: Pl5Page;
  let fixture: ComponentFixture<Pl5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pl5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pl5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
