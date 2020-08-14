import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPagePage } from './dev-page.page';

describe('DevPagePage', () => {
  let component: DevPagePage;
  let fixture: ComponentFixture<DevPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
