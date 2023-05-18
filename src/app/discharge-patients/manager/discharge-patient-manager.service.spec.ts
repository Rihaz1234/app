import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { DischargePatientManagerService } from "./discharge-patient-manager.service";

describe("DischargePatientManagerService", () => {
  let service: DischargePatientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot([]),
        HttpClientTestingModule],
    });
    service = TestBed.inject(DischargePatientManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
