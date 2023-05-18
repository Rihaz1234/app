import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService, MockAuthService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { ProfileComponent } from "./profile.component";
import { ManageUsersService, MockManageUsersService } from "../settings/manage-users/services/manage-users.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDialogMock } from "../settings/manage-users/manage-users-cfa/manage-users-cfa.component.spec";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let params: any;
  
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileComponent],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          MatSnackBarModule,
          TranslateModule.forRoot({}),
          MatDialogModule,
          NoopAnimationsModule,
        ],
        providers: [
          BackendApiService,
          KeycloakService,
          { provide: AuthenticationService, useClass: MockAuthService },
          { provide: ManageUsersService, useClass: MockManageUsersService },
          { provide: MatDialog, useClass: MatDialogMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
    params = {
      snackbarMessage: "Updates Saved",
      user: {
        timezone: "",
        units: "",
      },
    };
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the getTimeZones method", async () => {
    spyOn(component, "getTimeZones").and.callThrough();
    component.getTimeZones();
    expect(component.getTimeZones).toHaveBeenCalled();
  });
  it("should call the cancel method", async () => {
    spyOn(component, "cancel").and.callThrough();
    component.cancel();
    expect(component.valuesUpdated).toBeFalse();
    expect(component.cancel).toHaveBeenCalled();
  });
  it("should call the save method and get success response", async () => {
    spyOn(component, "save").and.callThrough();
    component.userId = "USR12345";
    component.user = params.user.units;
    component.save();
    expect(component.save).toHaveBeenCalled();    
  });
  it("should call the save method and get error response", async () => {
    spyOn(component, "save").and.callThrough();
    component.userId = null;
    component.user = params.user.units;
    component.save();
    expect(component.save).toHaveBeenCalled();
  });
  it("should call the confirmResetPassword method", async () => {
    spyOn(component, "confirmResetPassword").and.callThrough();
    component.confirmResetPassword();
    expect(component.confirmResetPassword).toHaveBeenCalled();
  });
  it("should call the resetPassword method", async () => {
    spyOn(component, "resetPassword").and.callThrough();
    component.resetPassword();
    expect(component.resetPassword).toHaveBeenCalled();
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar");
    component.openSnackBar(params.snackBarMessage);
    expect(component.openSnackBar).toHaveBeenCalledWith(params.snackBarMessage);
  });
  it("should call the selectZone method and set valuesUpdated to true", () => {
    component.selectZone();
    expect(component.valuesUpdated).toBeTrue();
  });
  it("should call the updated method and set valuesUpdated to true", () => {
    component.updated();
    expect(component.valuesUpdated).toBeTrue();
  });
});
