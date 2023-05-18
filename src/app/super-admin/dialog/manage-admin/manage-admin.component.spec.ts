import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { KeycloakService } from "keycloak-angular";

import { ManageAdminComponent } from "./manage-admin.component";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { StoreModule } from "@ngrx/store";
import { SnackbarService } from "@services/snackbar.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "@services/authentication.service";
import { TranslateModule } from "@ngx-translate/core";
import { AddEditSpAdminComponent } from "../add-edit-sp-admin/add-edit-sp-admin.component";
import { provideMockStore } from "@ngrx/store/testing";
import { selectActiveAdmins } from "src/app/shared/store/manage-admin/manage-admin.selector";
describe("ManageAdminComponent", () => {
  let component: ManageAdminComponent;
  let fixture: ComponentFixture<ManageAdminComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageAdminComponent,AddEditSpAdminComponent],
        imports: [
          MatDialogModule,
          HttpClientTestingModule,
          I18nModule,
          StoreModule.forRoot({}),
          TranslateModule.forRoot({}),
          MatSnackBarModule,NoopAnimationsModule
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {}  } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          KeycloakService,
          TranslateStore,
          SnackbarService,FormBuilder,AuthenticationService,
          provideMockStore({
            selectors: [
              {
                selector: selectActiveAdmins,
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
            ],
          }),        
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminComponent);
    component = fixture.componentInstance;
    params = {
      serviceProviderData: [
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
    }
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openAddAdminDialog method", () => {
    spyOn(component, "openAddAdminDialog").and.callThrough();
    component.openAddAdminDialog();
    expect(component.openAddAdminDialog).toHaveBeenCalled();
  });
  it("should call the openEditAdminDialog method", () => {
    spyOn(component, "openEditAdminDialog").and.callThrough();
    component.openEditAdminDialog(params.serviceProviderData);
    expect(component.openEditAdminDialog).toHaveBeenCalledWith(params.serviceProviderData);
  });
  it("should call the onClose method", () => {
    spyOn(component, "onClose").and.callThrough();
    component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
});
