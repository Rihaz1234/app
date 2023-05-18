import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

import { ManageGroupsManagerService } from "./manage-groups-manager.service";

describe("ManageGroupsManagerService", () => {
  let service: ManageGroupsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot([])],
    });
    service = TestBed.inject(ManageGroupsManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
