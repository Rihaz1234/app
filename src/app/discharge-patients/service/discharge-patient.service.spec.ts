import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DischargePatientService } from "./discharge-patient.service";

describe("DischargePatientService", () => {
  let service: DischargePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DischargePatientService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
