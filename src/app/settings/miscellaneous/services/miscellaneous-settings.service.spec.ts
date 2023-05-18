import { TestBed } from "@angular/core/testing";
import { MiscellaneousSettingsService } from "./miscellaneous-settings.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { KeycloakService } from "keycloak-angular";

describe("MiscellaneousSettingsService", () => {
  let service: MiscellaneousSettingsService;
  let httpTestingController: HttpTestingController;
  let params;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MiscellaneousSettingsService, KeycloakService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(MiscellaneousSettingsService);
    params = {
      additionalDevicesSettings: {
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
          emr: ""
        },
        facilityId: "",
        groupId: "",
      },
    };
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should call getSettings should return expected response", (done) => {
    const expectedData = {
      message: "Settings Fetched",
      status: "OK",
      data: params.additionalDevicesSettings,
    };
    let url = "clinical-facilities/CF12345/misc-settings";
    service.getSettings(url).subscribe(
      (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
      (error) => {
        console.log(error);
      }
    );
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/CF12345/misc-settings"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("GET");
  });
  it("should call updateSettings should return expected response", (done) => {
    const expectedData = {
      message: "Settings Updated",
      status: "OK",
      data: params.additionalDevicesSettings,
    };
    let dataUpdate = params.additionalDevicesSettings;
    service.updateSettings(dataUpdate).subscribe(
      (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
      (error) => {
        console.log(error);
      }
    );
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/misc-settings"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  it("should call factoryReset should return expected response", (done) => {
    const expectedData = {
      message: "Settings Reset",
      status: "OK",
      data: params.additionalDevicesSettings,
    };
    let url = "clinical-facilities/CF12345/misc-settings/factory-reset";
    service.resetSettings(url).subscribe(
      (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
      (error) => {
        console.log(error);
      }
    );
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/CF12345/misc-settings/factory-reset"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  // });
  it("should call getGroups and  should return expected response", (done) => {
    const cfId = "CF910341317";
    const expectedData = {
      data: [
        {
          FacilityId: "CF910341317",
          alertDestId: "",
          alertId: "AL741547195",
          groupId: "GRP1140711122",
          name: "SEPSIS",
        },
      ],
      message: "GROUPS_FETCHED",
      status: "OK",
    };
    service.getGroups(cfId).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/CF910341317/groups"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("GET");
  });
  it("should call getSignedUrl and  should return expected response", (done) => {
    const expectedData = {
      data: "dummyurl",
      message: "Url_generated",
      status: "OK",
    };
    let body = {
      filename: "dummyFileName",
    };
    service.getSignedUrl(body).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/files/upload-url"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  // it('should call uploadImage and  should return expected response', (done) => {
  //     const expectedData = {
  //         data: 'dummyurl',
  //         message: "Url_generated",
  //         status: "OK"
  //     };
  //     let url = "https://webui-s3.s3.ap-south-1.amazonaws.com/CF910341317/CliniMateTM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYO3SOWE22TOP24VY%2F20220120%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220120T055338Z&X-Amz-Expires=120&X-Amz";
  //     const mockFile = new File([''], 'filename', { type: 'image/jpeg' });
  //     service.uploadImage(url, mockFile).subscribe();
  //     const testRequest = httpTestingController.expectOne(url);
  //     testRequest.flush(expectedData);
  //     expect(testRequest.request.method).toEqual('PUT');
  // });
  it("should call the HandleError method", async () => {
    spyOn(service, "handleError").and.callThrough();
    let errorText = {
      error: {
        message: "Missing redirect_uri parameter.",
        type: "OAuthException",
        code: 191,
      },
    };
    // const error: Error = new Error(errorText);
    service.handleError(errorText);
    expect(service.handleError).toHaveBeenCalledWith(errorText);
  });
});
