import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { ManageUsersService } from "../services/manage-users.service";

import { ManageUsersCFAComponent } from "./manage-users-cfa.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  getLoaderStatus,
  getUsersCount,
  getUsersList,
} from "../store/manage-users.selector";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { UsersMockService } from "../services/users-mock.service";

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}
describe("ManageUsersCFAComponent", () => {
  let component: ManageUsersCFAComponent;
  let fixture: ComponentFixture<ManageUsersCFAComponent>;
  let params: any;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageUsersCFAComponent],
        imports: [
          RouterTestingModule,
          MatDialogModule,
          StoreModule.forRoot([]),
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          MatSnackBarModule,
          NoopAnimationsModule,
        ],
        providers: [
          AuthenticationService,
          KeycloakService,
          { provide: ManageUsersService, useClass: UsersMockService },
          { provide: MatDialog, useClass: MatDialogMock },
          provideMockStore({
            selectors: [
              {
                selector: getUsersList,
                value: [
                  {
                    createdBy: "cfa@cf1sp1.com",
                    createdDateTime: "2022-01-17 08:46:19",
                    facilityId: "CF910341317",
                    firstName: "Hema",
                    groupIds: null,
                    id: "USR486531945",
                    isActive: true,
                    lastName: "H",
                    modifiedBy: "cfa@cf1sp1.com",
                    modifiedById: "USR1137926066",
                    modifiedDateTime: "2022-01-18 10:17:19",
                    phoneNo: "+919845678989",
                    roles: ["GC"],
                    serviceProviderId: "SP1466274392",
                    timezone: "",
                    units: "",
                  },
                ],
              },
              {
                selector: getUsersCount,
                value: 1,
              },
              {
                selector: getLoaderStatus,
                value: true,
              },
            ],
          }),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersCFAComponent);
    component = fixture.componentInstance;
    component.roles = [];
    params = {
      user: {
        createdBy: "cfa@cf1sp1.com",
        createdDateTime: "2022-01-17 08:46:19",
        facilityId: "CF910341317",
        firstName: "Hema",
        groupIds: null,
        id: "USR486531945",
        isActive: true,
        lastName: "H",
        modifiedBy: "cfa@cf1sp1.com",
        modifiedById: "USR1137926066",
        modifiedDateTime: "2022-01-18 10:17:19",
        phoneNo: "+919845678989",
        roles: ["GC"],
        serviceProviderId: "SP1466274392",
        timezone: "",
        units: "",
      },
    };
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });
  afterEach(() => {
    store?.resetSelectors();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should load the loaded value from store and set loader state", () => {
    expect(component.loader).toBe(false);
  });
  it("should list atleast one user", () => {
    component.usersList$.subscribe((response) => {
      expect(response.length).toBe(1);
    });
  });
  it("Users list length tobe equal to userCount", () => {
    component.usersList$.subscribe((response) => {
      component.usersCount$.subscribe((count) => {
        expect(count).toEqual(response.length);
      });
    });
  });
  it("should call the getUsersList method", async () => {
    spyOn(component, "getUsersList").and.callThrough();
    component.getUsersList();
    expect(component.getUsersList).toHaveBeenCalled();
  });
  it("should call the addUser method", async () => {
    spyOn(component, "addUser").and.callThrough();
    component.addUser();
    expect(component.addUser).toHaveBeenCalled();
  });
  it("should call the editUser method", async () => {
    spyOn(component, "editUser").and.callThrough();
    component.editUser(params.user);
    expect(component.editUser).toHaveBeenCalledWith(params.user);
  });
  it("should call the sort method", () => {
    component.sort({ active: "firstName", direction: "asc" });
    expect(component.config.sort.active).toBe("firstName");
    expect(component.config.sort.direction).toBe("asc");
  });
  it("should call the search method", async () => {
    spyOn(component, "search").and.callThrough();
    component.search();
    expect(component.config.page.pageIndex + 1).toBe(1);
    expect(component.loader).toBeTrue();
    expect(component.search).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true is string is empty or undefined", async () => {
    spyOn(component, "isBlank").and.callThrough();
    let result = component.isBlank("");
    expect(result).toBeTrue();
  });
  it("should call the changeUserStatus method with event checked and enable user", async () => {
    spyOn(component, "changeUserStatus").and.callThrough();
    component.changeUserStatus(params.user, { checked: true });
    expect(params.user.isActive).toBeTrue();
  });
  it("should call the changeUserStatus method with event checked and disable user", async () => {
    spyOn(component, "changeUserStatus").and.callThrough();
    component.changeUserStatus(params.user, { checked: false });
    expect(params.user.isActive).toBeFalse();
  });
  it("should call the resetPassword", async () => {
    spyOn(component, "resetPassword").and.callThrough();
    component.resetPassword(params.user.id);
    expect(component.resetPassword).toHaveBeenCalledWith(params.user.id);
  });
  it("should call the confirmResetPassword method", async () => {
    spyOn(component, "confirmResetPassword").and.callThrough();
    component.confirmResetPassword(params.user.id);
    expect(component.confirmResetPassword).toHaveBeenCalledWith(params.user.id);
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar");
    component.openSnackBar(params.snackBarMessage);
    expect(component.openSnackBar).toHaveBeenCalledWith(params.snackBarMessage);
  });
});
