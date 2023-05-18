import { ComponentFixture, TestBed,waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";
import { OthersComponent } from "./others.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { BackendApiService } from "@services/backendapi.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import {
  getMiscellaneousError,
  getMiscellaneousSettings,
  getLoaderStatus,
} from "../store/alert-configuration.selector";
describe("OthersComponent", () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let params: any;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [OthersComponent ],
      imports: [
        StoreModule.forRoot([]),
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: AlertConfigurationsService,         
        },
        BackendApiService,
        KeycloakService,
        AuthenticationService,
        provideMockStore({
          selectors: [
            {
              selector: getMiscellaneousSettings,
              value: {
                thirdPartyDeviceSettings: [
                  {                   
                    type: "SPO2",
                    defaultDevice: "",
                    onTime: 20,
                    offTime: 20,
                    dutyCycle: 50,
                  },
                ],
                otherSettings: {
                  autoGeneratePatientId: true,
                  enableAccessToSPPHY: false,
                  facilityName: ""
                },
                patiendData:[{
                  patientId: "PATALDRT1",
                }]
              },
            },
            {
              selector: getMiscellaneousError,
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
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    component.patientData = "PATALDRT1";
    params = {
      tabSelected: "spo2",
      snackBarMessage: "Additional Devices Settings",
      index: 0,
    };
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });
  afterEach(() => {
    store?.resetSelectors();
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
  it("should call the openSnackBar method", () => {
    spyOn(component, "openSnackBar");
    component.openSnackBar(params.snackBarMessage);
    expect(component.openSnackBar).toHaveBeenCalledWith(params.snackBarMessage);
  });
  it("should call the showEditOnTime method", () => {
    component.showEditOnTime(params.index);
    expect(component.editOnTime[params.index]).toBeTrue();
  });
  it("should call the hideEditOnTime method", () => {
    component.hideEditOnTime(params.index);
    expect(component.editOnTime[params.index]).toBe(false);
  });
  it("should call the showEditOffTime method", () => {
    component.showEditOffTime(params.index);
    expect(component.editOffTime[params.index]).toBeTrue();
  });
  it("should call the hideEditOffTime method", () => {
    component.hideEditOffTime(params.index);
    expect(component.editOffTime[params.index]).toBe(false);
  });
  it("should call the getMiscSettings method", async () => {
    spyOn(component, "getMiscSettings").and.callThrough();
    component.getMiscSettings();
    expect(
      component.miscellaneousSettings.otherSettings.autoGeneratePatientId
    ).toEqual(true);
    expect(component.getMiscSettings).toHaveBeenCalled();
  });
  it("should call the factoryReset method", () => {
    spyOn(component, "factoryReset").and.callThrough();
    component.factoryReset();
    expect(component.factoryReset).toHaveBeenCalled();
  });
  it("should call the cancel method", () => {
    spyOn(component, "cancel").and.callThrough();
    component.cancel();
    expect(component.cancel).toHaveBeenCalled();
  });
  it("should call the closeEdit method", () => {
    component.closeEdit();
    expect(component.editOnTime).toEqual([false]);
    expect(component.editOffTime).toEqual([false]);
  });
  it("should call the onTimeValid method and return true if values are valid", () => {
    spyOn(component, "onTimeValid").and.callThrough();
    const result = component.onTimeValid(20, params.index);
    expect(result).toBe(true);
    expect(component.onTimeValid).toHaveBeenCalledWith(20, params.index);
  });
  it("should call the offTimeValid method and return true if values are valid", () => {
    spyOn(component, "offTimeValid").and.callThrough();
    const result = component.offTimeValid(0, params.index);
    expect(result).toBe(false);
    expect(component.offTimeValid).toHaveBeenCalledWith(0, params.index);
  });
  it("should call the invalidonoff method and return true if any of the values are invalid", () => {
    spyOn(component, "invalidonoff").and.callThrough();
    component.invalidon = [false];
    component.invalidoff = [false];
    const result = component.invalidonoff();
    expect(result).toBe(false);
  });
  it("should call the isBlank method and return true if value is blank/undefined", () => {
    spyOn(component, "isBlank").and.callThrough();
    const result = component.isBlank("");
    expect(result).toBe(true);
    expect(component.isBlank).toHaveBeenCalledWith("");
  });
  it("should call the updateSettings method", () => {
    spyOn(component, "updateSettings").and.callThrough();
    store.refreshState();
    component.updateSettings();
    expect(component.updateSettings).toHaveBeenCalled();
  });
});
