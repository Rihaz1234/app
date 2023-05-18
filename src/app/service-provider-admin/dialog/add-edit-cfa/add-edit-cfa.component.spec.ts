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
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { AddEditCfaComponent } from "./add-edit-cfa.component";
import { MatSelectModule } from "@angular/material/select";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services/snackbar.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { provideMockStore } from "@ngrx/store/testing";
import { addManageAdminFailure, addManageAdminSuccess, updateManageAdminFailure, updateManageAdminSuccess } from "src/app/shared/store/manage-admin/manage-admin.selector";

describe("AddEditCfaComponent", () => {
  let component: AddEditCfaComponent;
  let fixture: ComponentFixture<AddEditCfaComponent>;
  let params: any;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddEditCfaComponent, TelInputComponent],
        imports: [
          MatDialogModule,
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          HttpClientTestingModule,
          StoreModule.forRoot({}),
          LacMatTelInputModule,
          MatSelectModule,
          I18nModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: AuthenticationService, useClass: MockAuthService },
          BackendApiService,
          KeycloakService,
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
    fixture = TestBed.createComponent(AddEditCfaComponent);
    component = fixture.componentInstance;
    params = {
      cfAdmin: [
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
      cfAdminData: [
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
    component.addAddEditForm.controls["firstName"].setValue("");
    component.addAddEditForm.controls["lastName"].setValue("");
    component.addAddEditForm.controls["email"].setValue("");
    expect(component.addAddEditForm.valid).toBeFalsy();
  });
  it("It should call saveServiceProviderAdmin method Form should be valid", () => {
    component.addAddEditForm.controls["firstName"].setValue("Test");
    component.addAddEditForm.controls["lastName"].setValue("user");
    component.addAddEditForm.controls["email"].setValue("abc@gmail.com");
    component.addAddEditForm.controls['phoneNo'].setValue("+919745119669");
    expect(component.addAddEditForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addAddEditForm.valid).toBeTruthy();
    component.cfAdminData = params.cfAdminData;
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
    component.addAddEditForm.controls["firstName"].setValue("Test");
    component.addAddEditForm.controls["lastName"].setValue("user");
    component.addAddEditForm.controls["email"].setValue("abc@gmail.com");
     component.addAddEditForm.controls['phoneNo'].setValue("+919745119669");
    expect(component.addAddEditForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["email"].valid).toBeTruthy();
    expect(component.addAddEditForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addAddEditForm.valid).toBeTruthy();
    component.cfAdmin = params.cfAdmin;
    spyOn(component, "saveServiceProviderAdmin").and.callThrough();    
    component.saveServiceProviderAdmin();
    expect(component.saveServiceProviderAdmin).toHaveBeenCalled();
  });
});
