import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { BackendApiService } from "@services/backendapi.service";
import { SortService } from "@services/sort.service";
import { KeycloakService } from "keycloak-angular";
import { UserManagementComponent } from "./user-management.component";
import { I18nModule } from "../../i18n/i18n.module";
import { TranslateModule } from "@ngx-translate/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "@services/authentication.service";
import { AddEditUserManagementComponent } from "../dialog/add-edit-user-management/add-edit-user-management.component";
import { selectUserManagementList } from "../store/user-management/user-management.selector";
import { provideMockStore } from "@ngrx/store/testing";
import { EnableDisableComponent } from "../dialog/enable-disable/enable-disable.component";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { of } from "rxjs";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("UserManagementComponent", () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserManagementComponent,AddEditUserManagementComponent,EnableDisableComponent],
        imports: [
          MatDialogModule,
          StoreModule.forRoot([]),
          HttpClientTestingModule,
          MatSnackBarModule,
          I18nModule,
          TranslateModule.forRoot(),
          NoopAnimationsModule,
        ],
        providers: [
          SortService,
          BackendApiService,
          KeycloakService,
          FormBuilder,
          AuthenticationService,
          { provide: MatDialog, useClass: MatDialogMock },
          provideMockStore({
            selectors: [
              {
                selector: selectUserManagementList,
                value: [
                  {
                    id: "USR681255292",
                    isActive: true,
                    roles: [],
                    facilityId: "",
                    serviceProviderId: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNo: "",
                    createdBy: "",
                    createdById: "",
                    modifiedBy: "",
                    modifiedById: ""
                  },
                ],
              },
            ],
          }),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    params = {
      userData: {
        id: "USR1658363289",
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
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("manage_admin.");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the openAddUserManagementDialog method", () => {
    spyOn(component, "openAddUserManagementDialog").and.callThrough();
    component.openAddUserManagementDialog();
    expect(component.openAddUserManagementDialog).toHaveBeenCalled();
  });  
  it("should call the openEditUserManagement method", () => {
    spyOn(component, "openEditUserManagement").and.callThrough();
    component.openEditUserManagement("");
    expect(component.openEditUserManagement).toHaveBeenCalledWith("");
  });
  it("should call the resetPassword", () => {
    spyOn(component, "resetPassword").and.callThrough();
    component.resetPassword(params.userData);
    expect(component.resetPassword).toHaveBeenCalledWith(params.userData);
  }); 
  it("should call the toggleSwitch method", () => {
    spyOn(component, "toggleSwitch").and.callThrough();
    params.userData.isActive = true;
    const event = new MatSlideToggleChange(params.userData,true);
    component.toggleSwitch([{id:""}], event);  
    expect(component.toggleSwitch).toHaveBeenCalledWith([{id:""}], event);
  });
  it("should call the confirmResetPassword", () => {
    spyOn(component, "confirmResetPassword").and.callThrough();
    component.confirmResetPassword(params.userData);
    expect(component.confirmResetPassword).toHaveBeenCalledWith(params.userData);
  }); 
});
