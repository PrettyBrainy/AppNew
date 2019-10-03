import { TestBed } from '@angular/core/testing';

import { PledgeServiceService } from './pledge-service.service';

describe('PledgeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PledgeServiceService = TestBed.get(PledgeServiceService);
    expect(service).toBeTruthy();
  });
});
