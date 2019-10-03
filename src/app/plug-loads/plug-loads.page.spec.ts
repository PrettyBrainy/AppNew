import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugLoadsPage } from './plug-loads.page';

describe('PlugLoadsPage', () => {
  let component: PlugLoadsPage;
  let fixture: ComponentFixture<PlugLoadsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlugLoadsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugLoadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
