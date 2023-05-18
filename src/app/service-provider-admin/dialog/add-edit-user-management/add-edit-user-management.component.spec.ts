import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { AddEditUserManagementComponent } from "./add-edit-user-management.component";
import { MatSelectModule } from "@angular/material/select";
import { TelInputComponent } from "../../../shared/tel-input/tel-input.component";
import { LacMatTelInputModule } from "lac-mat-tel-input";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SnackbarService } from "@services/snackbar.service";
import { saveUserManagementFailure, saveUserManagementSuccess } from "../../store/user-management/user-management.selector";
import { provideMockStore } from "@ngrx/store/testing";

describe("AddEditUserManagementComponent", () => {
  let component: AddEditUserManagementComponent;
  let fixture: ComponentFixture<AddEditUserManagementComponent>;
  let params: any;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddEditUserManagementComponent, TelInputComponent],
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
          MatSelectModule,
          I18nModule,
          MatFormFieldModule,
          MatInputModule,
          MatSnackBarModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {}} },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: AuthenticationService, useClass: MockAuthService },
          BackendApiService,
          KeycloakService,
          TranslateStore,
          SnackbarService,
          provideMockStore({
            selectors: [
              {
                selector: saveUserManagementSuccess,
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
                selector: saveUserManagementFailure,
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
    fixture = TestBed.createComponent(AddEditUserManagementComponent);
    component = fixture.componentInstance;
    params = {
      user: [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SPP"],
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
      userData: [
        {
          id: "USR681255292",
          isActive: true,
          roles: ["SPP"],
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
    component.saveUser();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.addUserForm.controls["firstName"].setValue("");
    component.addUserForm.controls["lastName"].setValue("");
    component.addUserForm.controls["email"].setValue("");
    expect(component.addUserForm.valid).toBeFalsy();
  });
  it("It should call saveUser method Form should be valid", () => {
    component.addUserForm.controls["firstName"].setValue("Test");
    component.addUserForm.controls["lastName"].setValue("user");
    component.addUserForm.controls["email"].setValue("abc@gmail.com");
    component.addUserForm.controls['phoneNo'].setValue("+919745119669");
    component.addUserForm.controls["role"].setValue("['SPP']");
    expect(component.addUserForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["email"].valid).toBeTruthy();
    expect(component.addUserForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.addUserForm.controls["role"].valid).toBeTruthy();
    expect(component.addUserForm.valid).toBeTruthy();
    component.userData = params.userData;
    spyOn(component, "saveUser").and.callThrough();
    component.saveUser();
    expect(component.saveUser).toHaveBeenCalled();
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
  it("should call the saveUser method", () => {
    component.addUserForm.controls["firstName"].setValue("Test");
    component.addUserForm.controls["lastName"].setValue("user");
    component.addUserForm.controls["email"].setValue("abc@gmail.com");
    component.addUserForm.controls["role"].setValue("['SPP']");
    expect(component.addUserForm.controls["firstName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["lastName"].valid).toBeTruthy();
    expect(component.addUserForm.controls["email"].valid).toBeTruthy();
    expect(component.addUserForm.controls["role"].valid).toBeTruthy();
    expect(component.addUserForm.valid).toBeTruthy();
    component.user = params.user;
    spyOn(component, "saveUser").and.callThrough();    
    component.saveUser();
    expect(component.saveUser).toHaveBeenCalled();
  });
});
