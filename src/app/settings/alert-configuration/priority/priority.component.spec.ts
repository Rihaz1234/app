import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { PriorityComponent } from "./priority.component";

describe("PriorityComponent", () => {
  let component: PriorityComponent;
  let fixture: ComponentFixture<PriorityComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PriorityComponent],
        imports: [
          HttpClientTestingModule,
          MatSnackBarModule,
          StoreModule.forRoot([]),
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
    fixture = TestBed.createComponent(PriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the hidePriorityAlertEdit method", () => {
    spyOn(component, "hidePriorityAlertEdit").and.callThrough();
    component.hidePriorityAlertEdit();
    expect(component.hidePriorityAlertEdit).toHaveBeenCalled();
    expect(component.editPriority).toEqual([false]);
    expect(component.editPrio).toEqual([false]);
    expect(component.editBreakThrough).toEqual([false]);
    expect(component.editBreaksThrough).toEqual([false]);
  });

  it("should call the showHideEdit method", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Frequency Acknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "priorityACK");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Frequency UnAcknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "priorityNACK");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Break Through Acknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "breakThroughACK");
    expect(component.showHideEdit).toHaveBeenCalled();
  });

  it("should call the showHideEdit method - Alert Break Through UnAcknowledged", () => {
    spyOn(component, "showHideEdit").and.callThrough();
    component.showHideEdit(0, "breakThroughNACK");
    expect(component.showHideEdit).toHaveBeenCalled();
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
  it("should call the updatePrioritySettings method", () => {
    spyOn(component, "updatePrioritySettings").and.callThrough();
    component.updatePrioritySettings();
    expect(component.updatePrioritySettings).toHaveBeenCalled();
  });
  it("should call the priorityParamInputChanged method and check invalid alert frequency ack", () => {
    spyOn(component, "priorityParamInputChanged").and.callThrough();
    component.priorityAlertSettingsCopy[0]["Frequency_Ack"] = 5;
    component.priorityAlertSettingsCopy[0]["Frequency_UnAck"] = 120;
    component.priorityAlertSettings[0]["Frequency_Ack"] = 5;
    component.priorityAlertSettings[0]["Frequency_UnAck"] = 120;
    component.priorityParamInputChanged(0, "Frequency_Ack", {
      MIN: {
        Frequency_UnAck: 5,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        Frequency_Ack: 720,
      },
    });
    expect(component.priorityParamInputChanged).toHaveBeenCalled();
    expect(component.priorityAlertSettings[0]["Frequency_Ack"]).toBe(5);
  });
  it("should call the priorityParamInputChanged method and check invalid alert frequency UnAck", () => {
    spyOn(component, "priorityParamInputChanged").and.callThrough();
    component.priorityAlertSettingsCopy[0]["Frequency_Ack"] = 5;
    component.priorityAlertSettingsCopy[0]["Frequency_UnAck"] = 120;
    component.priorityAlertSettings[0]["Frequency_Ack"] = 5;
    component.priorityAlertSettings[0]["Frequency_UnAck"] = 120;
    component.priorityParamInputChanged(0, "Frequency_UnAck", {
      MIN: {
        Frequency_UnAck: 5,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        Frequency_Ack: 720,
      },
    });
    expect(component.priorityParamInputChanged).toHaveBeenCalled();
    expect(component.priorityAlertSettings[0]["Frequency_UnAck"]).toBe(120);
  });
  it("should call the priorityParamInputChanged method and check invalid alert Percentage ack", () => {
    spyOn(component, "priorityParamInputChanged").and.callThrough();
    component.priorityAlertSettingsCopy[0]["Percentage_Ack"] = 3;
    component.priorityAlertSettingsCopy[0]["Percentage_UnAck"] = 100;
    component.priorityAlertSettings[0]["Percentage_Ack"] = 3;
    component.priorityAlertSettings[0]["Percentage_UnAck"] = 100;
    component.priorityParamInputChanged(0, "Percentage_Ack", {
      MIN: {
        Percentage_UnAck: 30,
        Percentage_Ack: 30,
      },
      MAX: {
        Percentage_UnAck: 100,
        Percentage_Ack: 100,
      },
    });
    expect(component.priorityParamInputChanged).toHaveBeenCalled();
    expect(component.priorityAlertSettings[0]["Percentage_Ack"]).toBe(3);
  });
  it("should call the priorityParamInputChanged method and check invalid alert Percentage ack", () => {
    spyOn(component, "priorityParamInputChanged").and.callThrough();
    component.priorityAlertSettingsCopy[0]["Percentage_Ack"] = 3;
    component.priorityAlertSettingsCopy[0]["Percentage_UnAck"] = 100;
    component.priorityAlertSettings[0]["Percentage_Ack"] = 3;
    component.priorityAlertSettings[0]["Percentage_UnAck"] = 100;
    component.priorityParamInputChanged(0, "Percentage_UnAck", {
      MIN: {
        Percentage_UnAck: 30,
        Percentage_Ack: 30,
      },
      MAX: {
        Percentage_UnAck: 100,
        Percentage_Ack: 100,
      },
    });
    expect(component.priorityParamInputChanged).toHaveBeenCalled();
    expect(component.priorityAlertSettings[0]["Percentage_UnAck"]).toBe(100);
  });
});
