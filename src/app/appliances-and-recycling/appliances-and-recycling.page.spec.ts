import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancesAndRecyclingPage } from './appliances-and-recycling.page';

describe('AppliancesAndRecyclingPage', () => {
  let component: AppliancesAndRecyclingPage;
  let fixture: ComponentFixture<AppliancesAndRecyclingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliancesAndRecyclingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancesAndRecyclingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
