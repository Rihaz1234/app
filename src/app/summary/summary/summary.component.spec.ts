import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { SummaryComponent } from "./summary.component";

describe("SummaryComponent", () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SummaryComponent],
        imports: [HttpClientTestingModule, MatSnackBarModule, TranslateModule.forRoot({}),],
        providers: [
          BackendApiService,
          KeycloakService,
          { provide: AuthenticationService, useClass: MockAuthService },
          TranslateService
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
