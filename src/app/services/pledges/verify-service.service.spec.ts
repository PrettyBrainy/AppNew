import { TestBed } from '@angular/core/testing';

import { VerifyServiceService } from './verify-service.service';

describe('VerifyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyServiceService = TestBed.get(VerifyServiceService);
    expect(service).toBeTruthy();
  });
});
