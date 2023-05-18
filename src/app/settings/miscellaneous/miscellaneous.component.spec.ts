import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { AuthenticationService } from "@services/authentication.service";
import { KeycloakService } from "keycloak-angular";

import { MiscellaneousComponent } from "./miscellaneous.component";
import { MiscellaneousSettingsService } from "./services/miscellaneous-settings.service";
import { MiscellaneousMockService } from "./services/miscellaneous-mock.service";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  getMiscellaneousError,
  getMiscellaneousMessage,
  getMiscellaneousSettings,
} from "./store/miscellaneous-settings.selector";
import { By } from "@angular/platform-browser";
import { MatDialogModule } from "@angular/material/dialog";

describe("MiscellaneousComponent", () => {
  let component: MiscellaneousComponent;
  let fixture: ComponentFixture<MiscellaneousComponent>;
  let params: any;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MiscellaneousComponent],
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
            provide: MiscellaneousSettingsService,
            useClass: MiscellaneousMockService,
          },
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
                  ecgFilterSetting: "ECGFilterSetting",
                  bioSensorConfigSettings: {
                    ssid1: "ssid1",
                    ssid2: "ssid2",
                    password1: "password1",
                    password2: "Password2",
                  },
                  otherSettings: {
                    autoGeneratePatientId: true,
                    enableAccessToSPPHY: false,
                    facilityName: "",
                  },
                  facilityId: "",
                  groupId: "",
                },
              },
              {
                selector: getMiscellaneousMessage,
                value: "Settings Fetched",
              },
              {
                selector: getMiscellaneousError,
                value: "OPERATION_FAILED",
              },
            ],
          }),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousComponent);
    component = fixture.componentInstance;
    params = {
      role: ["CFA"],
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
  it("should have 1 group", () => {
    expect(component.groups.length).toEqual(1);
    expect(component.groupId).toEqual("GRP1140711122");
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
  it("should call the getMiscSettingsGrp method", () => {
    spyOn(component, "getMiscSettingsGrp").and.callThrough();
    component.getMiscSettingsGrp();
    expect(component.getMiscSettingsGrp).toHaveBeenCalled();
  });
  it("should call the updateSettings method", () => {
    spyOn(component, "updateSettings").and.callThrough();
    getMiscellaneousSettings.setResult({
      thirdPartyDeviceSettings: [
        {
          type: "SPO2",
          defaultDevice: "",
          onTime: 20,
          offTime: 20,
          dutyCycle: 50,
          isActive: true,
        },
      ],
      ecgFilterSettings: {
        ecgFilterSetting: "",
        isActive: true,
      },
      bioSensorConfigSettings: [
        {
          ssid1: "ssidnew",
          ssid2: "ssid2",
          password1: "password1",
          password2: "Password2",
          isActive: true,
        },
      ],
      otherSettings: {
        autoGeneratePatientId: true,
        enableAccessToSPPHY: false,
        facilityName: "",
        facilityLogo: "",
      },
      facilityId: "",
      groupId: "",
      miscSettingsId: 0,
    });
    store.refreshState();
    component.updateSettings();
    expect(
      component.miscellaneousSettings.bioSensorConfigSettings[0].ssid1
    ).toEqual("ssidnew");
    expect(component.updateSettings).toHaveBeenCalled();
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
    expect(component.editSsid1).toBe(false);
    expect(component.editSsid2).toBe(false);
    expect(component.editPass1).toBe(false);
    expect(component.editPass2).toBe(false);
  });
  it("should call the isInvalid method and return true if values are invalid", () => {
    spyOn(component, "isInvalid").and.callThrough();
    const result = component.isInvalid("", "ssid", "", "pass2");
    expect(result).toBe(true);
    expect(component.isInvalid).toHaveBeenCalledWith("", "ssid", "", "pass2");
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
  it("should call the upload method and return select file placeholder if file is not selected", () => {
    spyOn(component, "upload").and.callThrough();
    component.upload("");
    expect(component.fileName).toBe("Select File");
    expect(component.upload).toHaveBeenCalledWith("");
  });
  it("should call the upload method and call the mock upload function", () => {
    const mockFile = new File([""], "filename", { type: "image/jpeg" });
    const mockEvt = { target: { files: [mockFile] } };
    component.upload(mockEvt);
    expect(component.signedUrl).toBe(
      "https://webui-s3.s3.ap-south-1.amazonaws.com/CF910341317/CliniMateTM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYO3SOWE22TOP24VY%2F20220120%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220120T055338Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-id=PutObject&X-Amz-Signature=b056355a51d4742b464571dbe2c64636d2955a24a5f80ad5d5138a12b5067f8a"
    );
  });
  it("should call the upload method and call invalid format true", () => {
    const mockFile = new File([""], "filename", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.upload(mockEvt);
    expect(component.invalidFormat).toBeTrue();
  });
});
