import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivePatientsService } from "../services/active-patients.service";
import { PatientDetailsViewMoreComponent } from "./patient-details-view-more.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("PatientDetailsViewMoreComponent", () => {
  let component: PatientDetailsViewMoreComponent;
  let fixture: ComponentFixture<PatientDetailsViewMoreComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PatientDetailsViewMoreComponent],
        imports: [MatDialogModule, TranslateModule.forRoot({}),
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule],
        providers: [{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, TranslateService, ActivePatientsService,
          AuthenticationService,
          BackendApiService,
          KeycloakService,],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsViewMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
