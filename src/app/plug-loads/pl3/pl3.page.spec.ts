import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pl3Page } from './pl3.page';

describe('Pl3Page', () => {
  let component: Pl3Page;
  let fixture: ComponentFixture<Pl3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pl3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pl3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
