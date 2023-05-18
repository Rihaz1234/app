import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { SpinnerService } from "src/app/shared/_services/spinner.service";

import { AddEditSpAdminComponent } from "./add-edit-sp-admin.component";
import { MatSelectModule } from "@angular/material/select";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services/snackbar.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { addManageAdminFailure, addManageAdminSuccess } from "src/app/shared/store/manage-admin/manage-admin.selector";
import { provideMockStore } from "@ngrx/store/testing";

describe("AddEditSpAdminComponent", () => {
  let component: AddEditSpAdminComponent;
  let fixture: ComponentFixture<AddEditSpAdminComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddEditSpAdminComponent, TelInputComponent],
        imports: [
          FormsModule,
          MatDialogModule,
          ReactiveFormsModule,
          StoreModule.forRoot([]),
          HttpClientTestingModule,
          BrowserAnimationsModule,
          MatSelectModule,
          LacMatTelInputModule,
          I18nModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
        ],
        providers: [
          SpinnerService,
          KeycloakService,
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {close: () => {} } },
          { provide: AuthenticationService, useClass: MockAuthService },
          TranslateStore,
          SnackbarService,
          provideMockStore({
            selectors: [
              {
                selector: addManageAdminSuccess,
                value: [
                {
                  user:[{
                    id: "USR681255292",
                    isActive: true,
                    roles: ["SC"],
                    facilityId: "CF1623560475",
                    serviceProviderId: "SP916939960",
                    firstName: "abc",
                    lastName: "d",
                    email: "abc@gmail.com",
                    phoneNo: "",
                    createdBy: "CFA CFA",
                    createdById: "USR1497769743",
                    modifiedBy: "CFA CFA",
                    modifiedById: "USR1497769743"
                  }],
                }],
              },
              {
                selector: addManageAdminFailure,
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
    fixture = TestBed.createComponent(AddEditSpAdminComponent);
    component = fixture.componentInstance;
    params = {
      spAdmin: [
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
          createdBy: "CFA CFA",
          createdById: "USR1497769743",
          modifiedBy: "CFA CFA",
          modifiedById: "USR1497769743"
        },
      ],
      spAdminData: [
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
    component.saveServiceProviderAdmin();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.addEditForm .controls["firstName"].setValue("");
    component.addEditForm .controls["lastName"].setValue("");
    component.addEditForm .controls["email"].setValue("");
    expect(component.addEditForm .valid).toBeFalsy();
  });
  it("It should call saveServiceProviderAdmin method Form should be valid", () => {
    component.addEditForm.controls["firstName"].setValue("Test");
    component.addEditForm.controls["lastName"].setValue("user");
    component.addEditForm.controls["email"].setValue("abc@gmail.com");
    component.addEditForm.controls['phoneNo'].setValue("+919745119669");
    component.addEditForm.controls["email"].setValue("");
    expect(component.addEditForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addEditForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addEditForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addEditForm.valid).toBeTruthy();
    component.spAdminData = params.spAdminData;
    spyOn(component, "saveServiceProviderAdmin").and.callThrough();
    component.saveServiceProviderAdmin();
    expect(component.saveServiceProviderAdmin).toHaveBeenCalled();
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
  it("should call the saveServiceProviderAdmin method", () => {
    component.addEditForm.controls["firstName"].setValue("Test");
    component.addEditForm.controls["lastName"].setValue("user");
    component.addEditForm.controls["email"].setValue("abc@gmail.com");
    component.addEditForm.controls['phoneNo'].setValue("+919745119669");
    component.addEditForm.controls['email'].setValue("");
    expect(component.addEditForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addEditForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addEditForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addEditForm.valid).toBeTruthy();
    component.spAdmin = params.spAdmin;
    spyOn(component, "saveServiceProviderAdmin").and.callThrough();    
    component.saveServiceProviderAdmin();
    expect(component.saveServiceProviderAdmin).toHaveBeenCalled();
  });
});
