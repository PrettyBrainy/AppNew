import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabgraphpicsPage } from './labgraphpics.page';

describe('LabgraphpicsPage', () => {
  let component: LabgraphpicsPage;
  let fixture: ComponentFixture<LabgraphpicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabgraphpicsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabgraphpicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
