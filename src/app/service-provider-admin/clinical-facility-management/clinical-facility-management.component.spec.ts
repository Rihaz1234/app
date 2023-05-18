import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { StoreModule } from "@ngrx/store";
import { SortService } from "@services/sort.service";

import { ClinicalFacilityManagementComponent } from "./clinical-facility-management.component";
import { I18nModule } from "../../i18n/i18n.module";
import { TranslateModule } from "@ngx-translate/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";
import { BackendApiService } from "@services/backendapi.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakService } from "keycloak-angular";
import { AuthenticationService } from "@services/authentication.service";
import { AddEditFacilityComponent } from "../dialog/add-edit-facility/add-edit-facility.component";
import { ManageCfAdminComponent } from "../dialog/manage-cf-admin/manage-cf-admin.component";

describe("ClinicalFacilityManagementComponent", () => {
  let component: ClinicalFacilityManagementComponent;
  let fixture: ComponentFixture<ClinicalFacilityManagementComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClinicalFacilityManagementComponent,
          AddEditFacilityComponent,
          ManageCfAdminComponent],
        imports: [
          MatDialogModule,
          StoreModule.forRoot([]),
          I18nModule,
          TranslateModule.forRoot({}),
          NoopAnimationsModule,
          MatSnackBarModule,
        ],
        providers: [
          SortService,
          FormBuilder,
          BackendApiService,
          KeycloakService,
          AuthenticationService
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalFacilityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  
  it("should call the openAddFacilityDialog method", () => {
    spyOn(component, "openAddFacilityDialog").and.callThrough();
    component.openAddFacilityDialog();
    expect(component.openAddFacilityDialog).toHaveBeenCalled();
  });
  
  it("should call the openEditFacility method", () => {
    spyOn(component, "openEditFacility").and.callThrough();
    component.openEditFacility("");
    expect(component.openEditFacility).toHaveBeenCalledWith("");
  });
  
  it("should call the openManageAdmin method", () => {
    spyOn(component, "openManageAdmin").and.callThrough();
    component.openManageAdmin("");
    expect(component.openManageAdmin).toHaveBeenCalledWith("");
  });
});
