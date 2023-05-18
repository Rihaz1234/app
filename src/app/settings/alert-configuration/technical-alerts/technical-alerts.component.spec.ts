import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";

import { TechnicalAlertsComponent } from "./technical-alerts.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TechnicalAlertsComponent", () => {
  let component: TechnicalAlertsComponent;
  let fixture: ComponentFixture<TechnicalAlertsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechnicalAlertsComponent],
        imports: [
          StoreModule.forRoot([]),
          MatSnackBarModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          NoopAnimationsModule,
        ],
        providers: [
          BackendApiService,
          KeycloakService,
          AuthenticationService,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the hideTechnicalAlertEdit method", () => {
    spyOn(component, "hideTechnicalAlertEdit").and.callThrough();
    component.hideTechnicalAlertEdit();
    expect(component.hideTechnicalAlertEdit).toHaveBeenCalled();
    expect(component.editAlertFrequency).toEqual([false]);
    expect(component.editDelaytime).toEqual([false]);
    expect(component.editAlertFrequencyUnAck).toEqual([false]);
  });

  it("should call the showHideEdit method", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Frequency Acknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "alertFrequencyACK");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Frequency UnAcknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "alertFrequencyNACK");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Delay Time", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "delay");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the toggle method", () => {
    spyOn(component, "toggle").and.callThrough();
    component.toggle(0);
    expect(component.toggle).toHaveBeenCalled();
  });

  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar").and.callThrough();
    component.openSnackBar("Test Message");
    expect(component.openSnackBar).toHaveBeenCalled();
  });
  it("should call the openSnackBarTranslation method", () => {
    spyOn(component, "openSnackBarTranslation").and.callThrough();
    component.openSnackBarTranslation("Test Message",0);
    expect(component.openSnackBarTranslation).toHaveBeenCalled();
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the updateTechnicalSettings method", () => {
    spyOn(component, "updateTechnicalSettings").and.callThrough();
    component.updateTechnicalSettings();
    expect(component.updateTechnicalSettings).toHaveBeenCalled();
  });
  it("should call the technicalParamInputChanged method and check invalid Freq Ack Value", () => {
    spyOn(component, "technicalParamInputChanged").and.callThrough();
    component.technicalAlertSettingsCopy[0]["Frequency_Ack"] = 50;
    component.technicalAlertSettingsCopy[0]["Frequency_UnAck"] = 90;
    component.technicalAlertSettings[0]["Frequency_Ack"] = 150;
    component.technicalAlertSettings[0]["Frequency_UnAck"] = 120;
    component.technicalParamInputChanged(0, "Frequency_Ack", {
      MIN: {
        Frequency_UnAck: 60,
        CondDelay: 20,
        Frequency_Ack: 30,
      },
      MAX: {
        Frequency_UnAck: 250,
        CondDelay: 300,
        Frequency_Ack: 120,
      },
    });
    expect(component.technicalParamInputChanged).toHaveBeenCalled();
    expect(component.technicalAlertSettings[0]["Frequency_Ack"]).toBe(50);
  });

  it("should call the technicalParamInputChanged method and check invalid Freq UnAck Value", () => {
    spyOn(component, "technicalParamInputChanged").and.callThrough();
    component.technicalAlertSettingsCopy[0]["Frequency_Ack"] = 50;
    component.technicalAlertSettingsCopy[0]["Frequency_UnAck"] = 90;
    component.technicalAlertSettings[0]["Frequency_Ack"] = 150;
    component.technicalAlertSettings[0]["Frequency_UnAck"] = 200;
    component.technicalParamInputChanged(0, "Frequency_UnAck", {
      MIN: {
        Frequency_UnAck: 60,
        CondDelay: 20,
        Frequency_Ack: 30,
      },
      MAX: {
        Frequency_UnAck: 250,
        CondDelay: 300,
        Frequency_Ack: 120,
      },
    });
    expect(component.technicalParamInputChanged).toHaveBeenCalled();
    expect(component.technicalAlertSettings[0]["Frequency_UnAck"]).toBe(90);
  });
});
