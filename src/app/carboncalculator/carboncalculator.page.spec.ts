import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarboncalculatorPage } from './carboncalculator.page';

describe('CarboncalculatorPage', () => {
  let component: CarboncalculatorPage;
  let fixture: ComponentFixture<CarboncalculatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarboncalculatorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarboncalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
