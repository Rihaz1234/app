import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { ManageServiceProviderComponent } from "./manage-service-provider.component";
import { I18nModule } from "../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { AddEditServiceProviderComponent } from "../dialog/add-edit-service-provider/add-edit-service-provider.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from "@services/authentication.service";
import { TranslateModule } from "@ngx-translate/core";
import { ManageAdminComponent } from "../dialog/manage-admin/manage-admin.component";
import { selectManageServiceProviderList } from "../store/manage-service-provider/manage-service-provider.selector";
import { provideMockStore } from "@ngrx/store/testing";
describe("ManageServiceProviderComponent", () => {
  let component: ManageServiceProviderComponent;
  let fixture: ComponentFixture<ManageServiceProviderComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageServiceProviderComponent,
          AddEditServiceProviderComponent,ManageAdminComponent],
        imports: [
          MatDialogModule,
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
          TranslateModule.forRoot({}),
          I18nModule,NoopAnimationsModule,          
        ],
        providers: [
          BackendApiService,
          KeycloakService,
          TranslateStore,
          FormBuilder,
          AuthenticationService,
          provideMockStore({
            selectors: [
              {
                selector: selectManageServiceProviderList,
                value: [
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
              },
            ],
          }),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServiceProviderComponent);
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
    }
    fixture.detectChanges();
  });
  
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the openAddServiceProviderDialog method", () => {
    spyOn(component, "openAddServiceProviderDialog").and.callThrough();
    component.openAddServiceProviderDialog();
    expect(component.openAddServiceProviderDialog).toHaveBeenCalled();
  });
  it("should call the openEditServiceProvider method", () => {
    spyOn(component, "openEditServiceProvider").and.callThrough();
    component.openEditServiceProvider(params.serviceProvider);
    expect(component.openEditServiceProvider).toHaveBeenCalledWith(params.serviceProvider);
  });
  it("should call the openManageAdmin method", () => {
    spyOn(component, "openManageAdmin").and.callThrough();
    component.openManageAdmin(params.serviceProvider);
    expect(component.openManageAdmin).toHaveBeenCalledWith(params.serviceProvider);
  });
});
