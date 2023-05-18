import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";

import { ManageGroupsService } from "./manage-groups.service";

describe("ManageGroupsService", () => {
  let service: ManageGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [{ provide: AuthenticationService, useClass: MockAuthService }, KeycloakService],
    });
    service = TestBed.inject(ManageGroupsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
