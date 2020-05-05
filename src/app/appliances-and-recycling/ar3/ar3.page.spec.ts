import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ar3Page } from './ar3.page';

describe('Ar3Page', () => {
  let component: Ar3Page;
  let fixture: ComponentFixture<Ar3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ar3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ar3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
