import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ed3docsPage } from './ed3docs.page';

describe('Ed3docsPage', () => {
  let component: Ed3docsPage;
  let fixture: ComponentFixture<Ed3docsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ed3docsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ed3docsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
