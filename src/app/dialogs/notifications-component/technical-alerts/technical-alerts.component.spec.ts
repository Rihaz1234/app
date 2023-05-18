import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { BackendApiService } from "@services/backendapi.service";
import { KeycloakService } from "keycloak-angular";
import {
  getAlertConfigurations,
  getAlertConfigurationError,
  getLoaderStatus
} from "../store/alert-configuration.selector"
import { TechnicalAlertsComponent } from "./technical-alerts.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
describe("TechnicalAlertsComponent", () => {
  let component: TechnicalAlertsComponent;
  let fixture: ComponentFixture<TechnicalAlertsComponent>;
  let store: MockStore;
  let params: any;
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
        MatDialogModule,
      ],
      providers: [
        BackendApiService,
        KeycloakService,
        AuthenticationService,
        provideMockStore({
          selectors: [
            {
              selector: getAlertConfigurations,
              value: {
                patiendData:[{
                  patientId: "PATALDRT1",
                }],               
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
    fixture = TestBed.createComponent(TechnicalAlertsComponent);  
    params = {
      tabSelected: "parameter",
      snackBarMessage: "Alert Settings",
      index: 0,
      userRoles: ["CFA"],
      allowedRoles: ["CFA", "SC"],
      
    };  
    component = fixture.componentInstance;
    component.patientData = "PATALDRT1";
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
  it("should call the showEditAlertFrequency method - Show Alert Frequency Acknowledged", () => {
    spyOn(component, "showEditAlertFrequency").and.callThrough();
    component.showEditAlertFrequency(0);
    expect(component.showEditAlertFrequency).toHaveBeenCalled();
  });
  it("should call the hideEditAlertFrequency method - Hide Alert Frequency Acknowledged", () => {
    spyOn(component, "hideEditAlertFrequency").and.callThrough();
    component.hideEditAlertFrequency(0);
    expect(component.hideEditAlertFrequency).toHaveBeenCalled();
  });
  it("should call the showEditAlertFrequencyUnAck method - Show Alert Frequency UnAcknowledged", () => {
    spyOn(component, "showEditAlertFrequencyUnAck").and.callThrough();
    component.showEditAlertFrequencyUnAck(0);
    expect(component.showEditAlertFrequencyUnAck).toHaveBeenCalled();
  });
  it("should call the hideEditAlertFrequencyUnAck method - Hide Alert Frequency UnAcknowledged", () => {
    spyOn(component, "hideEditAlertFrequencyUnAck").and.callThrough();
    component.hideEditAlertFrequencyUnAck(0);
    expect(component.hideEditAlertFrequencyUnAck).toHaveBeenCalled();
  });
  it("should call the showEditDelaytime method - Show Delay Time ", () => {
    spyOn(component, "showEditDelaytime").and.callThrough();
    component.showEditDelaytime(0);
    expect(component.showEditDelaytime).toHaveBeenCalled();
  });
  it("should call the hideEditDelaytime method - Hide Delay Time", () => {
    spyOn(component, "hideEditDelaytime").and.callThrough();
    component.hideEditDelaytime(0);
    expect(component.hideEditDelaytime).toHaveBeenCalled();
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
  it("should call the technicalParamInputChanged method and check invalid Freq Ack Value", () => {
    spyOn(component, "technicalParamInputChanged").and.callThrough();
    component.technicalAlertSettingsCopy =[{
      Frequency_Ack: 50,
      Frequency_UnAck: 90
    }]
    component.technicalAlertSettings =[{
      Frequency_Ack: 120,
      Frequency_UnAck: 160
    }]    
    component.technicalParamInputChanged(0, "Frequency_Ack", {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 20,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 50,
        CondDelay: 300,
        Frequency_Ack: 50,
      },
    });
    expect(component.technicalParamInputChanged).toHaveBeenCalled();
    expect(component.technicalAlertSettings[0]["Frequency_Ack"]).toBe(50);
  });

  it("should call the technicalParamInputChanged method and check invalid Freq UnAck Value", () => {
    spyOn(component, "technicalParamInputChanged").and.callThrough();
    component.technicalAlertSettingsCopy = [{
      Frequency_Ack: 30,
      Frequency_UnAck: 90,
    }]
    component.technicalAlertSettings = [{
      Frequency_Ack: 150,
      Frequency_UnAck:  200,
    }]
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
