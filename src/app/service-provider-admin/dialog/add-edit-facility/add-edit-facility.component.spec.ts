import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AuthenticationService,MockAuthService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { AddEditFacilityComponent } from "./add-edit-facility.component";
import { MatSelectModule } from "@angular/material/select";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateModule, TranslateStore } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services/snackbar.service";
import { saveClinicalFacilityFailure, saveClinicalFacilitySuccess } from "../../store/clinical-facility-management/clinical-facility-management.selector";
import { provideMockStore } from "@ngrx/store/testing";

describe("AddEditFacilityComponent", () => {
  let component: AddEditFacilityComponent;
  let fixture: ComponentFixture<AddEditFacilityComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddEditFacilityComponent, TelInputComponent],
        imports: [
          MatDialogModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
          LacMatTelInputModule,
          BrowserAnimationsModule,
          MatRadioModule,
          MatCheckboxModule,
          MatSelectModule,
          TranslateModule.forChild({}),
          I18nModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {} } },
          BackendApiService,
          KeycloakService,
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: AuthenticationService, useClass: MockAuthService },
          TranslateStore,
          SnackbarService,
          provideMockStore({
            selectors: [
              {
                selector: saveClinicalFacilitySuccess,
                value: [
                {
                  ClinicalFacility:[{
                    id: "USR681255292",
                    isActive: true,
                    roles: ["SC"],
                    facilityId: "CF1623560475",
                    serviceProviderId: "SP916939960",
                    firstName: "abc",
                    lastName: "d",
                    email: "abc@gmail.com",
                    name: "",
                    address: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                    multiFactorAuthEn: true,
                    dataStorageMode: "",
                    zipCode: "",
                    phoneNo: "",
                    createdBy: "CFA CFA",
                    createdById: "USR1497769743",
                    modifiedBy: "CFA CFA",
                    modifiedById: "USR1497769743"
                }],
              }]
              },
              {
                selector: saveClinicalFacilityFailure,
                value: [{
                  error: "",
                  save_admin_success: "",
                  save_admin_error: "",
                  userId: "",
                }],
              },
            ],
          }),        
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFacilityComponent);
    component = fixture.componentInstance;
    params = {
      clinicalFacility: [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SC"],
          facilityId: "CF1623560475",
          serviceProviderId: "SP916939960",
          firstName: "abc",
          lastName: "d",
          email: "abc@gmail.com",
          name: "",
          address: "",
          area: "",
          city: "",
          state: "",
          country: "",
          multiFactorAuthEn: true,
          dataStorageMode: "",
          zipCode: "",
          phoneNo: "",
          createdBy: "CFA CFA",
          createdById: "USR1497769743",
          modifiedBy: "CFA CFA",
          modifiedById: "USR1497769743"
        },
      ],
      clinicalFacilityData: [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SC"],
          facilityId: "CF1623560475",
          serviceProviderId: "SP916939960",
          firstName: "abc",
          lastName: "d",
          email: "abc@gmail.com",
          name: "",
          address: "",
          area: "",
          city: "",
          state: "",
          country: "",
          multiFactorAuthEn: true,
          dataStorageMode: "",
          zipCode: "",
          phoneNo: "",
          createdBy: "CFA CFA",
          createdById: "USR1497769743",
          modifiedBy: "CFA CFA",
          modifiedById: "USR1497769743"
        },
      ],
    }
    component.selectedCountryData = [
        {
          name: "India",
          isoCode: "IN",
          countryCode: "INR",
          latitude: "20.00000000", 
          longitude: "77.00000000",
        },
    ],
    component.selectedCityData = [
        {
          name: "India",
          isoCode: "IN",
          countryCode: "INR",
          stateCode: "KL",
          latitude: "20.00000000", 
          longitude: "77.00000000",
        },
    ],
    component.countryArray = [{
          name: "India",
          phonecode: "91",
          flag: "IN",
          currency: "INR",
          latitude: "20.00000000",
          longitude: "77.00000000",
          timezones: [{}],
    }]  
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("It should set submitted to true", () => {
    component.saveFacility();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.facilityForm.controls["firstName"].setValue("");
    component.facilityForm.controls["lastName"].setValue("");
    component.facilityForm.controls["email"].setValue("");
    expect(component.facilityForm.valid).toBeFalsy();
  });
  it("It should call saveFacility method Form should be valid", () => {
    component.facilityForm.controls["name"].setValue("abc");
    component.facilityForm.controls['address'].setValue("khd");
    component.facilityForm.controls["area"].setValue("t");
    component.facilityForm.controls["country"].setValue("['INDIA','USA']");
    component.facilityForm.controls["state"].setValue("['KERALA','KARNATAKA']");
    component.facilityForm.controls["firstName"].setValue("Test");
    component.facilityForm.controls["lastName"].setValue("user");
    component.facilityForm.controls["email"].setValue("abc@gmail.com");
    component.facilityForm.controls['phoneNo'].setValue("+919745119669");
    component.facilityForm.controls["dataStorageMode"].setValue("archived");
    component.facilityForm.controls["multiFactorAuthEn"].setValue(true);
    component.facilityForm.controls["zipCode"].setValue("");
    expect(component.facilityForm.controls["name"].valid).toBeTruthy();;
    expect(component.facilityForm.controls['address'].valid).toBeTruthy();;
    expect(component.facilityForm.controls["area"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["country"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["state"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["firstName"].valid).toBeTruthy();
    expect(component.facilityForm.controls["lastName"].valid).toBeTruthy();
    expect(component.facilityForm.controls["email"].valid).toBeTruthy();
    expect(component.facilityForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.facilityForm.controls["dataStorageMode"].valid).toBeTruthy();
    expect(component.facilityForm.controls["multiFactorAuthEn"].valid).toBeTruthy();
    expect(component.facilityForm.controls["zipCode"].valid).toBeTruthy();
    expect(component.facilityForm.valid).toBeTruthy();
    component.clinicalFacilityData  = params.clinicalFacilityData ;
    component.countryArray = [{
      name: "India",
      phonecode: "91",
      flag: "IN",
      currency: "INR",
      latitude: "20.00000000",
      longitude: "77.00000000",
      timezones: [{}],
    }]  
    spyOn(component, "saveFacility").and.callThrough();
    component.saveFacility();
    expect(component.saveFacility).toHaveBeenCalled();
  });
  it("should call the onClose method", () => {
    spyOn(component, "onClose").and.callThrough();
    component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
  it("should call the setupCountryStateCity method", () => {
    spyOn(component, "setupCountryStateCity").and.callThrough();
    component.clinicalFacilityData  = params.clinicalFacilityData.name;
    component.countryArray = [{
      name: "India",
      phonecode: "91",
      flag: "IN",
      currency: "INR",
      latitude: "20.00000000",
      longitude: "77.00000000",
      timezones: [{}],
    }]  
    component.setupCountryStateCity();
    expect(component.setupCountryStateCity).toHaveBeenCalled();
  });
  it("should call the charsOnly method", () => {
    spyOn(component, "charsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.charsOnly("",event);
    expect(component.charsOnly).toHaveBeenCalled();
  });
  it("should call the saveFacility method", () => {
    component.facilityForm.controls["name"].setValue("abc");
    component.facilityForm.controls['address'].setValue("khd");
    component.facilityForm.controls["area"].setValue("t");
    component.facilityForm.controls["country"].setValue("['INDIA','USA']");
    component.facilityForm.controls["state"].setValue("['KERALA','KARNATAKA']");
    component.facilityForm.controls["firstName"].setValue("Test");
    component.facilityForm.controls["lastName"].setValue("user");
    component.facilityForm.controls["email"].setValue("");
    component.facilityForm.controls['phoneNo'].setValue("+919745119669");
    component.facilityForm.controls["dataStorageMode"].setValue("archived");
    component.facilityForm.controls["multiFactorAuthEn"].setValue(true);
    component.facilityForm.controls["zipCode"].setValue("");
    expect(component.facilityForm.controls["name"].valid).toBeTruthy();;
    expect(component.facilityForm.controls['address'].valid).toBeTruthy();;
    expect(component.facilityForm.controls["area"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["country"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["state"].valid).toBeTruthy();;
    expect(component.facilityForm.controls["firstName"].valid).toBeTruthy();
    expect(component.facilityForm.controls["lastName"].valid).toBeTruthy();
    expect(component.facilityForm.controls["email"].valid).toBeTruthy();
    expect(component.facilityForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.facilityForm.controls["dataStorageMode"].valid).toBeTruthy();
    expect(component.facilityForm.controls["multiFactorAuthEn"].valid).toBeTruthy();
    expect(component.facilityForm.controls["zipCode"].valid).toBeTruthy();
    expect(component.facilityForm.valid).toBeTruthy();
    component.clinicalFacility = params.clinicalFacility;
    component.selectedCountryData = params.selectedCountryData;
    spyOn(component, "saveFacility").and.callThrough();    
    component.saveFacility();
    expect(component.saveFacility).toHaveBeenCalled();
  });
});
