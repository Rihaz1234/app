import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  StoreModule,
} from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { alertConfigMinMaxValues } from "@utils/helpers";
import { ParameterAlertsComponent } from "./parameter-alerts.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { provideMockStore } from "@ngrx/store/testing";
import {
  getAlertConfigurations
} from "../store/alert-configuration.selector"
describe("ParameterAlertsComponent", () => {
  let component: ParameterAlertsComponent;
  let fixture: ComponentFixture<ParameterAlertsComponent>;
  let params: any;
  let numericsOnlyPattern = /^[0-9]$/;

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
      event: KeyboardEvent
    };
    component = fixture.componentInstance;
    component.userPreferenceUnit = "SI";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call the parameterThresholdChanged method and check invalid Low Threshold Value", () => {
    spyOn(component, "parameterThresholdChanged").and.callThrough();
    component.parameterAlertSettingsCopy[0]["LowThr"] = 50;
    component.parameterAlertSettingsCopy[0]["HighThr"] = 90;
    component.parameterAlertSettings[0]["LowThr"] = 5;
    component.parameterAlertSettings[0]["HighThr"] = 5;
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
    component.parameterAlertSettingsCopy[0]["LowThr"] = 50;
    component.parameterAlertSettingsCopy[0]["HighThr"] = 90;
    component.parameterAlertSettings[0]["LowThr"] = 150;
    component.parameterAlertSettings[0]["HighThr"] = 120;
    component.parameterThresholdChanged(0, "HighThr", {
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
    expect(component.parameterAlertSettings[0]["HighThr"]).toBe(90);
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
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the updateParameterSettings method", () => {
    spyOn(component, "updateParameterSettings").and.callThrough();
    component.updateParameterSettings();
    expect(component.updateParameterSettings).toHaveBeenCalled();
  });
  it("should call the limitChar method", () => {
    spyOn(component, "limitChar").and.callThrough();
    component.limitChar("",KeyboardEvent);
    expect(component.limitChar).toHaveBeenCalledWith("",KeyboardEvent);
  });
  it("should call the openSnackBarTranslation method", () => {
    spyOn(component, "openSnackBarTranslation").and.callThrough();
    component.openSnackBarTranslation("Test Message",0);
    expect(component.openSnackBarTranslation).toHaveBeenCalled();
  });
  it("should call the numericsOnly method", () => {
    spyOn(component, "numericsOnly").and.callThrough();
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });
    component.numericsOnly("",event);
    expect(component.numericsOnly).toHaveBeenCalled();
  });
});
