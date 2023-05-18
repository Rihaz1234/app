import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { AddEditServiceProviderComponent } from "./add-edit-service-provider.component";
import { MatSelectModule } from "@angular/material/select";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services/snackbar.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { addServiceProviderFailure, addServiceProviderSuccess } from "../../store/manage-service-provider/manage-service-provider.selector";
import { provideMockStore } from "@ngrx/store/testing";

describe("AddEditServiceProviderComponent", () => {
  let component: AddEditServiceProviderComponent;
  let fixture: ComponentFixture<AddEditServiceProviderComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddEditServiceProviderComponent, TelInputComponent],
        imports: [
          FormsModule,
          MatDialogModule,
          ReactiveFormsModule,
          StoreModule.forRoot([]),
          LacMatTelInputModule,
          MatRadioModule,
          BrowserAnimationsModule,
          HttpClientTestingModule,
          MatSelectModule,
          I18nModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          BackendApiService,
          { provide: AuthenticationService, useClass: MockAuthService },
          KeycloakService,
          TranslateStore,
          SnackbarService,
          provideMockStore({
            selectors: [
              {
                selector: addServiceProviderSuccess,
                value: [
                {
                  ServiceProvider:[{
                    id: "USR681255292",
                    isActive: true,
                    roles: ["SC"],
                    facilityId: "CF1623560475",
                    serviceProviderId: "SP916939960",
                    firstName: "abc",
                    lastName: "d",
                    email: "abc@gmail.com",
                    phoneNo: "",
                    companyName: "",
                    addressLine1: "",
                    addressLine2: "",
                    createdBy: "CFA CFA",
                    createdById: "USR1497769743",
                    modifiedBy: "CFA CFA",
                    modifiedById: "USR1497769743"
                  }],
                }],
              },
              {
                selector: addServiceProviderFailure,
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
    fixture = TestBed.createComponent(AddEditServiceProviderComponent);
    component = fixture.componentInstance;
    params = {
      serviceProvider: [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SC"],
          facilityId: "CF1623560475",
          serviceProviderId: "SP916939960",
          firstName: "abc",
          lastName: "d",
          email: "abc@gmail.com",
          phoneNo: "",
          companyName: "",
          addressLine1: "",
          addressLine2: "",
          createdBy: "CFA CFA",
          createdById: "USR1497769743",
          modifiedBy: "CFA CFA",
          modifiedById: "USR1497769743"
        },
      ],
      serviceProviderData : [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SC"],
          facilityId: "CF1623560475",
          serviceProviderId: "SP916939960",
          firstName: "abc",
          lastName: "d",
          email: "abc@gmail.com",
          phoneNo: "",
          companyName: "",
          addressLine1: "",
          addressLine2: "",
          createdBy: "CFA CFA",
          createdById: "USR1497769743",
          modifiedBy: "CFA CFA",
          modifiedById: "USR1497769743"
        },
      ],
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("It should set submitted to true", () => {
    component.saveServiceProvider();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.addServiceProviderForm.controls["firstName"].setValue("");
    component.addServiceProviderForm.controls["lastName"].setValue("");
    component.addServiceProviderForm.controls["email"].setValue("");
    expect(component.addServiceProviderForm.valid).toBeFalsy();
  });
  it("It should call saveServiceProvider method Form should be valid", () => {
    component.addServiceProviderForm.controls["companyName"].setValue("cname");
    component.addServiceProviderForm.controls["addressLine1"].setValue("address1");
    component.addServiceProviderForm.controls['addressLine2'].setValue("address2");  
    component.addServiceProviderForm.controls["firstName"].setValue("Test");
    component.addServiceProviderForm.controls["lastName"].setValue("user");
    component.addServiceProviderForm.controls["email"].setValue("");
    component.addServiceProviderForm.controls['phoneNo'].setValue("+919745119669"); 
    expect(component.addServiceProviderForm.controls["companyName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["addressLine1"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["addressLine2"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["email"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.valid).toBeTruthy();
    component.serviceProviderData = params.serviceProviderData;
    spyOn(component, "saveServiceProvider").and.callThrough();
    component.saveServiceProvider();
    expect(component.saveServiceProvider).toHaveBeenCalled();
  });
  it("should call the onClose method", () => {
    spyOn(component, "onClose").and.callThrough();
    component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
  it("should call the charsOnly method", () => {
    spyOn(component, "charsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.charsOnly("",event);
    expect(component.charsOnly).toHaveBeenCalled();
  });
  it("should call the saveServiceProvider method", () => {
    component.addServiceProviderForm.controls["companyName"].setValue("cname");
    component.addServiceProviderForm.controls["addressLine1"].setValue("address1");
    component.addServiceProviderForm.controls['addressLine2'].setValue("address2");  
    component.addServiceProviderForm.controls["firstName"].setValue("Test");
    component.addServiceProviderForm.controls["lastName"].setValue("user");
    component.addServiceProviderForm.controls["email"].setValue("");
    component.addServiceProviderForm.controls['phoneNo'].setValue("+919745119669");
    expect(component.addServiceProviderForm.controls["companyName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["addressLine1"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["addressLine2"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["email"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addServiceProviderForm.valid).toBeTruthy();
    component.serviceProvider = params.serviceProvider;
    spyOn(component, "saveServiceProvider").and.callThrough();    
    component.saveServiceProvider();
    expect(component.saveServiceProvider).toHaveBeenCalled();
  });
});
