import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTextPage } from './verify-text.page';

describe('VerifyTextPage', () => {
  let component: VerifyTextPage;
  let fixture: ComponentFixture<VerifyTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
