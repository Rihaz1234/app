import { TestBed } from '@angular/core/testing';

import { NestedDropdownService } from './nested-dropdown.service';

describe('NestedDropdownService', () => {
  let service: NestedDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestedDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
