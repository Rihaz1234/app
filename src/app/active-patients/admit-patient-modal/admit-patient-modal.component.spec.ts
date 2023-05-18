import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { ActivePatientsService } from "../services/active-patients.service";

import { AdmitPatientModalComponent } from "./admit-patient-modal.component";
import { BackendApiService } from "@services/backendapi.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";

describe("AdmitPatientModalComponent", () => {
  let component: AdmitPatientModalComponent;
  let fixture: ComponentFixture<AdmitPatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmitPatientModalComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        TranslateModule.forRoot({}),
        MatAutocompleteModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthService },
        ActivePatientsService,
        BackendApiService,
        KeycloakService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
