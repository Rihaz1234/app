import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { KeycloakService } from "keycloak-angular";

import { ManageAdminService } from "./manage-admin.service";

describe("ManageAdminService", () => {
  let service: ManageAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakService],
    });
    service = TestBed.inject(ManageAdminService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
