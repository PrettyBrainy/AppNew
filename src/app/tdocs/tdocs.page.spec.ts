import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdocsPage } from './tdocs.page';

describe('TdocsPage', () => {
  let component: TdocsPage;
  let fixture: ComponentFixture<TdocsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdocsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
