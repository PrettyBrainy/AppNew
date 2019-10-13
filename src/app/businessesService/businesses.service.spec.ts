import { TestBed } from '@angular/core/testing';

import { BusinessesService } from './businesses.service';

describe('BusinessesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessesService = TestBed.get(BusinessesService);
    expect(service).toBeTruthy();
  });
});
