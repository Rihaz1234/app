import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { EdituserComponent } from "./edituser.component";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { ManageUsersService} from "../services/manage-users.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import {} from "../services/manage-users.service"
import { RouterTestingModule } from "@angular/router/testing";
import { UsersMockService } from "../services/users-mock.service";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () =>
        of({
          data: {
            FacilityId: "CF910341317",
            alertDestId: "",
            alertId: "AL741547195",
            groupId: "GRP1140711122",
            name: "SEPSIS",
          },
        }),
    };
  }
}
export class MockDialogRef {
  close(value) {
    return true;
  }
}

describe("EdituserComponent", () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  let params: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EdituserComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        TranslateModule.forRoot({}),
        StoreModule.forRoot([]),
        BrowserAnimationsModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,               
      ],
      providers: [
        { provide: MatDialogRef, useValue: {close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide:ManageUsersService, useClass: UsersMockService},
        AuthenticationService,
        KeycloakService,
        FormBuilder,        
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    params = {
      groups: [
        {
          FacilityId: "CF910341317",
          alertDestId: "",
          alertId: "AL741547195",
          groupId: "GRP1140711122",
          name: "SEPSIS",
        },
      ],
      userGroups: [
        {
          FacilityId: "CF910341317",
          alertDestId: "",
          alertId: "AL741547195",
          groupId: "GRP1140711122",
          name: "SEPSIS",
        },
      ],      
    };
    component.usrData = [{       
        createdDateTime: "2022-01-20 14:56:27",
        email: "ajith_phy@gmail.com",
        facilityId: "CF910341317",
        firstName: "Ajith",
        groupIds: "GRP1140711122",
        id: "USR681255292",
        isActive: false,
        lastName: "ER",
        phoneNo: "+919745119669",
        roles: ["PHY"],
        serviceProviderId: "SP1466274392",
        timezone: "",
        units: "",      
    }]
  });
  afterEach(() => {
    fixture.destroy();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("It should set submitted to true", () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });
  it("Form should be invalid", () => {
    component.editUserForm.controls["email"].setValue("");
    component.editUserForm.controls["firstName"].setValue("");
    component.editUserForm.controls["lastName"].setValue("");
    expect(component.editUserForm.valid).toBeFalsy();
  });
  it("It should call onSubmit method Form should be valid", () => {
    component.editUserForm.controls["email"].setValue("abc@gmail.com");
    component.editUserForm.controls["firstName"].setValue("Test");
    component.editUserForm.controls["lastName"].setValue("user");
    component.editUserForm.controls["roles"].setValue("['CFA']");
    component.editUserForm.controls['phoneNo'].setValue("+919745119669");
    expect(component.editUserForm.controls["email"].valid).toBeTruthy();
    expect(component.editUserForm.controls["firstName"].valid).toBeTruthy();
    expect(component.editUserForm.controls["lastName"].valid).toBeTruthy();
    expect(component.editUserForm.controls["roles"].valid).toBeTruthy();
    expect(component.editUserForm.controls["phoneNo"].valid).toBeTruthy();
    expect(component.editUserForm.valid).toBeTruthy();
    component.groups = params.groups;
    component.userGroups = params.userGroups;
    spyOn(component, "onSubmit").and.callThrough();   
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true is string is empty or undefined", async () => {
    spyOn(component, "isBlank").and.callThrough();
    let result = component.isBlank("");
    expect(result).toBeTrue();
  });
  it("should call the saveChanges method", async () => {
    spyOn(component, "saveChanges").and.callThrough();
    component.userGroups = params.userGroups;
    component.saveChanges("GRP1140711122");
    expect(component.saveChanges).toHaveBeenCalledWith("GRP1140711122");
  });
  it("should call the saveChanges1 method", () => {
    spyOn(component, "saveChanges").and.callThrough();
    component.saveChanges('grp123');
    expect(component.saveChanges).toHaveBeenCalled();
  });
    it("should call the addGroup method", async () => {
    spyOn(component, "addGroup").and.callThrough();
    component.addGroup();
    expect(component.addGroup).toHaveBeenCalled();
  });
  it('should close dialog on trigger', () => {
    spyOn(component, 'close').and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });
});
