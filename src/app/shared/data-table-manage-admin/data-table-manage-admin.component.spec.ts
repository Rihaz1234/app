import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { DataTableManageAdminComponent } from "./data-table-manage-admin.component";
import { I18nModule } from "../../i18n/i18n.module";
import { TranslateModule, TranslateStore } from "@ngx-translate/core";
import { SnackbarService } from "@services/snackbar.service";
import { provideMockStore } from "@ngrx/store/testing";
import { selectManageAdminList } from "../store/manage-admin/manage-admin.selector";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ManageAdminService } from "../_services/manage-admin.service";
import { DebugElement } from "@angular/core";
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
describe("DataTableManageAdminComponent", () => {
  let component: DataTableManageAdminComponent;
  let fixture: ComponentFixture<DataTableManageAdminComponent>;
  let params: any;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DataTableManageAdminComponent],
       
        imports: [
          HttpClientTestingModule,
          MatSnackBarModule,
          MatDialogModule,
          StoreModule.forRoot([]),
          I18nModule,
          MatSlideToggleModule,
          TranslateModule.forRoot(),
          NoopAnimationsModule],
          providers: [
            BackendApiService,
            KeycloakService,
            TranslateStore,
            SnackbarService,
            ManageAdminService,
            { provide: MatDialog, useClass: MatDialogMock },
          provideMockStore({
            selectors: [
              {
                selector: selectManageAdminList,
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
    fixture = TestBed.createComponent(DataTableManageAdminComponent);
    component = fixture.componentInstance;
    params = {
      adminUserData: [{
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
      }],
      event: KeyboardEvent,
     
    };
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });  
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the openAddAdminDialog method", () => {
    spyOn(component, "openAddAdminDialog").and.callThrough();
    component.openAddAdminDialog();
    expect(component.openAddAdminDialog).toHaveBeenCalled();
  });
  it("should call the openEditAdminDialog method", () => {
    spyOn(component, "openEditAdminDialog").and.callThrough();
    component.openEditAdminDialog(params.adminUserData);
    expect(component.openEditAdminDialog).toHaveBeenCalledWith(params.adminUserData);
  });
  it("should call the resetPassword", async() => {
    spyOn(component, "resetPassword").and.callThrough();
    component.resetPassword(params.adminUserData);
    expect(component.resetPassword).toHaveBeenCalledWith(params.adminUserData);
  }); 
  it("should call the ngOnDestroy method", () => {
    spyOn(component, "ngOnDestroy").and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  }); 
  it("should call the doSubscriptionFormSelector method", () => {
    spyOn(component, "doSubscriptionFormSelector").and.callThrough();
    component.doSubscriptionFormSelector(params.event,params.adminUserData);
    expect(component.doSubscriptionFormSelector).toHaveBeenCalledWith(params.event,params.adminUserData);
  });
  it("should call the confirmResetPassword", () => {
    spyOn(component, "confirmResetPassword").and.callThrough();
    component.confirmResetPassword(params.adminUserData);
    expect(component.confirmResetPassword).toHaveBeenCalledWith(params.adminUserData);
  }); 
  it("should call the openActiveInActiveDialogs", () => {
    spyOn(component, "openActiveInActiveDialogs").and.callThrough();
    component.openActiveInActiveDialogs(event,"ACTIVE",params.adminUserData);
    expect(component.openActiveInActiveDialogs).toHaveBeenCalledWith(event,"ACTIVE",params.adminUserData);
  }); 
});
