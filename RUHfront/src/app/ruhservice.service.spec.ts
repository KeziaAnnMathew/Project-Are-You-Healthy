import { TestBed } from '@angular/core/testing';

import { RuhserviceService } from './ruhservice.service';

describe('RuhserviceService', () => {
  let service: RuhserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuhserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
