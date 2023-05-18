import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { ActivePatientManagerService } from "./active-patient-manager.service";

describe("ActivePatientManagerService", () => {
  let service: ActivePatientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot([])],
    });
    service = TestBed.inject(ActivePatientManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
