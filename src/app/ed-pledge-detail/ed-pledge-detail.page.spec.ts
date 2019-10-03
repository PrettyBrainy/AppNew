import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdPledgeDetailPage } from './ed-pledge-detail.page';

describe('EdPledgeDetailPage', () => {
  let component: EdPledgeDetailPage;
  let fixture: ComponentFixture<EdPledgeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdPledgeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdPledgeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
