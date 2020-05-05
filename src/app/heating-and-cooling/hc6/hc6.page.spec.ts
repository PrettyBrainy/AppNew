import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hc6Page } from './hc6.page';

describe('Hc6Page', () => {
  let component: Hc6Page;
  let fixture: ComponentFixture<Hc6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hc6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hc6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
