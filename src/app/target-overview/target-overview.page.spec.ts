import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetOverviewPage } from './target-overview.page';

describe('TargetOverviewPage', () => {
  let component: TargetOverviewPage;
  let fixture: ComponentFixture<TargetOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
