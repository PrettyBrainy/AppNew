import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed2docsPage } from './ed2docs.page';

describe('Ed2docsPage', () => {
  let component: Ed2docsPage;
  let fixture: ComponentFixture<Ed2docsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed2docsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed2docsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
