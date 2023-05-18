import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { KeycloakService } from "keycloak-angular";

import { SuperAdminService } from "./super-admin.service";

describe("SuperAdminService", () => {
  let service: SuperAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperAdminService, KeycloakService],
    });
    service = TestBed.inject(SuperAdminService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
