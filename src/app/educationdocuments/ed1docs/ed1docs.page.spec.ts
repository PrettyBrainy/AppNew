import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed1docsPage } from './ed1docs.page';

describe('Ed1docsPage', () => {
  let component: Ed1docsPage;
  let fixture: ComponentFixture<Ed1docsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed1docsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed1docsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
