import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { CommonService } from "@services/common.service";
import { KeycloakService } from "keycloak-angular";
import { provideMockStore } from "@ngrx/store/testing";
import { AlertConfigurationComponent } from "./alert-configuration.component";
import { initialAlertConfigurationState } from "./store/alert-configuration.reducer";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("AlertConfigurationComponent", () => {
  let component: AlertConfigurationComponent;
  let fixture: ComponentFixture<AlertConfigurationComponent>;
  let params: any;

  beforeEach(
    waitForAsync(() => {
      const initialState = initialAlertConfigurationState;
      TestBed.configureTestingModule({
        declarations: [AlertConfigurationComponent],
        imports: [
          MatDialogModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
          RouterTestingModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          NoopAnimationsModule,
        ],
        providers: [
          BackendApiService,
          KeycloakService,
          AuthenticationService,
          CommonService,
          provideMockStore({ initialState }),
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfigurationComponent);
    component = fixture.componentInstance;
    params = {
      userRoles: ["CFA"],
      allowedRoles: ["CFA", "SC"],
      tabSelected: "parameter",
      snackBarMessage: "Hello Life Signals",
      navigationUrl: "alert-settings/root/1",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the checkRole method and return true for allowed role", () => {
    spyOn(component, "checkRole").and.callThrough();
    component.roles = params.userRoles;
    const result = component.checkRole(params.allowedRoles, params.userRoles);
    expect(result).toBe(true);
    expect(component.checkRole).toHaveBeenCalledWith(
      params.allowedRoles,
      params.userRoles
    );
  });

  it("should call the checkRole method and return false for non access role", () => {
    spyOn(component, "checkRole").and.callThrough();
    component.roles = params.userRoles;
    const result = component.checkRole(params.allowedRoles, ["PHY"]);
    expect(result).toBe(false);
    expect(component.checkRole).toHaveBeenCalledWith(params.allowedRoles, [
      "PHY",
    ]);
  });

  it("should call the selectTab method", () => {
    spyOn(component, "selectTab").and.callThrough();
    component.selectTab(params.tabSelected);
    expect(component.selectedTab).toBe(params.tabSelected);
    expect(component.selectTab).toHaveBeenCalledWith(params.tabSelected);
  });

  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar");
    component.openSnackBar(params.snackBarMessage);
    expect(component.openSnackBar).toHaveBeenCalledWith(params.snackBarMessage);
  });

  it("should call the handleAlertSettingsEditCancel method", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsEditCancel method - Parameter Alerts", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("parameter");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsEditCancel method - Technical Alerts", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("technical");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsEditCancel method - Priority Alerts", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("priority");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsEditCancel method - Destination Alerts", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("destination");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsEditCancel method - Alert Notification", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.selectTab("message");
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });

  it("should call the handleFactoryReset method", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.selectTab("");
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });

  it("should call the handleFactoryReset method - Parameter Alerts", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.selectTab("parameter");
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });

  it("should call the handleFactoryReset method - Technical Alerts", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.selectTab("technical");
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });

  it("should call the handleFactoryReset method - Priority Alerts", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.selectTab("priority");
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });

  it("should call the handleFactoryReset method - Alert Notification", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.selectTab("message");
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsSave method", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsSave method - Parameter Alerts", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("parameter");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsSave method - Technical Alerts", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("technical");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsSave method - Priority Alerts", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("priority");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });

  it("should call the handleAlertSettingsSave method - Alert Notification", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("message");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });
  it("should call the handleAlertSettingsSave method - Destination Alerts", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.selectTab("destination");
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });

  it("should call the navigateUrl method", () => {
    spyOn(component, "navigateUrl").and.callThrough();
    component.navigateUrl(params.navigationUrl);
    expect(component.navigateUrl).toHaveBeenCalledWith(params.navigationUrl);
  });

  it("should call the openDialog method", () => {
    spyOn(component, "openDialog");
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });

  it("should call the getGroupAlertSettings method", async () => {
    spyOn(component, "getGroupAlertSettings").and.callThrough();
    component.getGroupAlertSettings();
    expect(component.getGroupAlertSettings).toHaveBeenCalled();
  });
  
  it("should call the getClinicalFacilityGroups method", async () => {
    spyOn(component, "getClinicalFacilityGroups").and.callThrough();
    component.getClinicalFacilityGroups();
    expect(component.getClinicalFacilityGroups).toHaveBeenCalled();
  });

});
