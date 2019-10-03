import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdpledgelistPage } from './edpledgelist.page';

describe('EdpledgelistPage', () => {
  let component: EdpledgelistPage;
  let fixture: ComponentFixture<EdpledgelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdpledgelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdpledgelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
