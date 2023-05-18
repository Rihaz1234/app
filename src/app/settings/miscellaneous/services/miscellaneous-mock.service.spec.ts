import { TestBed } from "@angular/core/testing";

import { MiscellaneousMockService } from "./miscellaneous-mock.service";

describe("MiscellaneousMockService", () => {
  let service: MiscellaneousMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiscellaneousMockService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
