import { TestBed } from '@angular/core/testing';

import { EdPledgeServiceService } from './ed-pledge-service.service';

describe('EdPledgeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdPledgeServiceService = TestBed.get(EdPledgeServiceService);
    expect(service).toBeTruthy();
  });
});
