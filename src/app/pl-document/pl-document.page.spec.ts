import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlDocumentPage } from './pl-document.page';

describe('PlDocumentPage', () => {
  let component: PlDocumentPage;
  let fixture: ComponentFixture<PlDocumentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlDocumentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
