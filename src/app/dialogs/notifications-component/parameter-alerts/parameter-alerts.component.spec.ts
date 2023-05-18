import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  StoreModule,
} from "@ngrx/store";
import { ParameterAlertsComponent } from "./parameter-alerts.component";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { alertConfigMinMaxValues } from "@utils/helpers";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { provideMockStore } from "@ngrx/store/testing";
import {
  getAlertConfigurations,
  getAlertConfigurationError,
  getLoaderStatus
} from "../store/alert-configuration.selector"

describe("ParameterAlertsComponent", () => {
  let component: ParameterAlertsComponent;
  let fixture: ComponentFixture<ParameterAlertsComponent>;
  let params: any;
  

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
          TranslateModule.forRoot({}),
          NoopAnimationsModule,
          MatDialogModule,
        ],
      declarations: [ParameterAlertsComponent],
      providers: [
        BackendApiService,
        KeycloakService,
        AuthenticationService, 
        AlertConfigurationsService, 
        provideMockStore({
          selectors: [
            {
              selector: getAlertConfigurations,
              value: {
                patiendData:[{
                  patientId: "PATALDRT1",
                }],
                Setting: {
                  Param: {
                    PhyParam: {
                      HR: {
                        Enabled: false,
                        Priority: "",
                        LowThr: 0,
                        HighThr: 0,
                        CondDelay: 0
                      },
                    }
                  }
                }
              },
            },
            {
              selector: getAlertConfigurationError,
              value: "OPERATION_FAILED",
            },
            {
              selector: getLoaderStatus,
              value: true,
            },
          ],
        })
      ],           
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterAlertsComponent);
    params = {
      parameterMinMax: alertConfigMinMaxValues.parameterAlerts,
      tabSelected: "parameter",
      userRoles: ["GC"],
      allowedRoles: ["GC", "SC","CFA"],
      event: KeyboardEvent,
    };  
    component = fixture.componentInstance;
    component.patientData = "PATALDRT1"; 
    component.userPreferenceUnit = "SI";
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should load the loaded value from store and set loader state", () => {
    expect(component.loader).toBe(false);
  });
  it("should call the selectTab method", () => {
    spyOn(component, "selectTab").and.callThrough();
    component.selectTab(params.tabSelected);
    expect(component.selectedTab).toBe(params.tabSelected);
    expect(component.selectTab).toHaveBeenCalledWith(params.tabSelected);
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

  it("should call the hideParameterEdit method", () => {
    spyOn(component, "hideParameterEdit").and.callThrough();
    component.hideParameterEdit();
    expect(component.hideParameterEdit).toHaveBeenCalled();
    expect(component.editThreshold).toEqual([false]);
    expect(component.editPrior).toEqual([false]);
    expect(component.editDelay).toEqual([false]);
  });

  it("should call the showHideEdit method", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showEdit method", () => {
    spyOn(component, "showEdit").and.callThrough();
    component.showEdit(0);
    expect(component.showEdit).toHaveBeenCalled();
    expect(component.editThreshold).toEqual([true]);
  });

  it("should call the hideEdit method", () => {
    spyOn(component, "hideEdit").and.callThrough();
    component.hideEdit(0);
    expect(component.hideEdit).toHaveBeenCalled();
    expect(component.editThreshold).toEqual([false]);
  });

  it("should call the showEditPrior method", () => {
    spyOn(component, "showEditPrior").and.callThrough();
    component.showEditPrior(0);
    expect(component.showEditPrior).toHaveBeenCalled();
    expect(component.editPrior).toEqual([true]);
  });

  it("should call the hideEditPrior method", () => {
    spyOn(component, "hideEditPrior").and.callThrough();
    component.hideEditPrior(0);
    expect(component.hideEditPrior).toHaveBeenCalled();
    expect(component.editPrior).toEqual([false]);
  });

  it("should call the showEditDelay method", () => {
    spyOn(component, "showEditDelay").and.callThrough();
    component.showEditDelay(0);
    expect(component.showEditDelay).toHaveBeenCalled();
    expect(component.editDelay).toEqual([true]);
  });

  it("should call the hideEditDelay method", () => {
    spyOn(component, "hideEditDelay").and.callThrough();
    component.hideEditDelay(0);
    expect(component.hideEditDelay).toHaveBeenCalled();
    expect(component.editDelay).toEqual([false]);
  });
  it("should call the showHideEdit method - Threshold Fields", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "threshold");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Priority Fields", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "priority");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Delay Fields", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "delay");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the toggle method", () => {
    spyOn(component, "toggle").and.callThrough();
    component.toggle(0);
    expect(component.toggle).toHaveBeenCalled();
  });
  it("should call the handleAlertSettingsEditCancel method", () => {
    spyOn(component, "handleAlertSettingsEditCancel").and.callThrough();
    component.handleAlertSettingsEditCancel();
    expect(component.handleAlertSettingsEditCancel).toHaveBeenCalled();
  });
  it("should call the handleAlertSettingsSave method", () => {
    spyOn(component, "handleAlertSettingsSave").and.callThrough();
    component.handleAlertSettingsSave();
    expect(component.handleAlertSettingsSave).toHaveBeenCalled();
  });
  it("should call the toggle method", () => {
    spyOn(component, "toggle").and.callThrough();
    component.toggle(0);
    expect(component.toggle).toHaveBeenCalled();
  });
  it("should call the handleFactoryReset method", () => {
    spyOn(component, "handleFactoryReset").and.callThrough();
    component.handleFactoryReset();
    expect(component.handleFactoryReset).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the openDialog method", () => {
    spyOn(component, "openDialog");
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });
  it("should call the parameterThresholdChanged method and check invalid Low Threshold Value", () => {
    spyOn(component, "parameterThresholdChanged").and.callThrough();
    component.parameterAlertSettingsCopy = [{
      LowThr: 50,
      HighThr:90
    }] 
    
    component.parameterAlertSettings = [{
      LowThr: 5,
      HighThr: 5
    }]
    component.parameterThresholdChanged(0, "LowThr", {
      MIN: {
        HighThr: 60,
        CondDelay: 20,
        LowThr: 30,
      },
      MAX: {
        HighThr: 250,
        CondDelay: 300,
        LowThr: 120,
      },
    });
    expect(component.parameterThresholdChanged).toHaveBeenCalled();
    expect(component.parameterAlertSettings[0]["LowThr"]).toBe(50);
  });
  it("should call the parameterThresholdChanged method and check invalid High Threshold Value", () => {
    spyOn(component, "parameterThresholdChanged").and.callThrough();
    component.parameterAlertSettingsCopy = [{
      LowThr: 50,
      HighThr:90
    }]     
    component.parameterAlertSettings = [{
      LowThr: 5,
      HighThr: 5
    }]
    component.parameterThresholdChanged(0, "HighThr", {
      MIN: {
        HighThr: 5,
        CondDelay: 20,
        LowThr: 5,
      },
      MAX: {
        HighThr: 250,
        CondDelay: 300,
        LowThr: 120,
      },
    });
    expect(component.parameterThresholdChanged).toHaveBeenCalled();
    expect(component.parameterAlertSettings[0]["HighThr"]).toBe(90);
  });
  it("should call the limitChar method", () => {
    spyOn(component, "limitChar").and.callThrough();
    component.limitChar("",KeyboardEvent);
    expect(component.limitChar).toHaveBeenCalledWith("",KeyboardEvent);
  });
  it("should call the updateParameterSettings method", () => {
    spyOn(component, "updateParameterSettings").and.callThrough();
    component.updateParameterSettings();
    expect(component.updateParameterSettings).toHaveBeenCalled();
  });
});
