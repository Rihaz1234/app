import { TestBed } from '@angular/core/testing';

import { RelaysMockService } from './relays-mock.service';

describe('RelaysMockService', () => {
  let service: RelaysMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelaysMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
