import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingPage } from './lighting.page';

describe('LightingPage', () => {
  let component: LightingPage;
  let fixture: ComponentFixture<LightingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
