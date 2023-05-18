import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { EnableDisableComponent } from "./enable-disable.component";
import { I18nModule } from "../../../i18n/i18n.module";
import { TranslateStore } from "@ngx-translate/core";

describe("EnableDisableComponent", () => {
  let component: EnableDisableComponent;
  let fixture: ComponentFixture<EnableDisableComponent>;
  let params: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnableDisableComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot([]),
        I18nModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {close: () => {}  } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        BackendApiService,
        KeycloakService,
        TranslateStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableDisableComponent);
    component = fixture.componentInstance;
    params = {
      userData: {
        id: "",
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
      event: KeyboardEvent,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the onCancel method to DISABLE user", () => {
    spyOn(component, "onCancel").and.callThrough();
    component.mode = "DISABLE";
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
  });
  it("should call the onCancel method to ENABLE user", () => {
    spyOn(component, "onCancel").and.callThrough();
    component.mode = "ENABLE";
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
  });
  it("should call the onConfirm method to DisableUserAction", () => {
    spyOn(component, "onConfirm").and.callThrough();
    component.mode = "DISABLE";
    component.userData = params.userData.id;
    component.onConfirm();
    expect(component.onConfirm).toHaveBeenCalled();
  });
  it("should call the onConfirm method to EnableUserAction", () => {
    spyOn(component, "onConfirm").and.callThrough();
    component.mode = "ENABLE";
    component.userData = params.userData.id;
    component.onConfirm();
    expect(component.onConfirm).toHaveBeenCalled();
  });
});
