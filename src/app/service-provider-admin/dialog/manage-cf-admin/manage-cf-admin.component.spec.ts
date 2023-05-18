import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { ManageCfAdminComponent } from "./manage-cf-admin.component";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";
import { AddEditCfaComponent } from "../add-edit-cfa/add-edit-cfa.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AuthenticationService } from "@services/authentication.service";

describe("ManageCfAdminComponent", () => {
  let component: ManageCfAdminComponent;
  let fixture: ComponentFixture<ManageCfAdminComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageCfAdminComponent,
          AddEditCfaComponent],
        imports: [
          MatDialogModule,
          RouterTestingModule,
          HttpClientModule,
          MatSnackBarModule,
          I18nModule,
          NoopAnimationsModule,
          StoreModule.forRoot([]),
        ],
        providers: [
          { provide: MatDialogRef, useValue: {close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          BackendApiService,
          KeycloakService,
          TranslateStore,
          FormBuilder,
          AuthenticationService
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCfAdminComponent);
    component = fixture.componentInstance;
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
    component.openEditAdminDialog("");
    expect(component.openEditAdminDialog).toHaveBeenCalledWith("");
  });
  it("should call the onClose method", () => {
    spyOn(component, "onClose").and.callThrough();
    component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
});
