import { TestBed } from "@angular/core/testing";
import { ManageUsersService } from "./manage-users.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  AddUser,
  CFUser,
  QueryParams,
} from "../../../interfaces/manage-users.interface";
import { KeycloakService } from "keycloak-angular";

describe("ManageUsersService", () => {
  let httpTestingController: HttpTestingController;
  let service: ManageUsersService;
  let params;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManageUsersService, KeycloakService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ManageUsersService);
    params = {
      user: {
        createdDateTime: "2022-01-20 14:56:27",
        email: "ajith_phy@gmail.com",
        facilityId: "CF910341317",
        firstName: "Ajith",
        groupIds: null,
        id: "USR681255292",
        isActive: false,
        lastName: "ER",
        phoneNo: "+919745119669",
        roles: ["PHY"],
        serviceProviderId: "SP1466274392",
        timezone: "",
        units: "",
      },
    };
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("#getUsersList should return expected UsersList", (done) => {
    const expectedData = {
      message: "Users Fetched",
      status: "OK",
      data: {
        items: [params.user],
        total: 20,
      },
    };
    const param: QueryParams = {
      url: "clinical-facilities/CF910341317/users",
      page: 1,
      size: 5,
      sortBy: "",
      searchText: "",
    };
    service.getAdminUsersList(param).subscribe(
      (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
      (error) => {
        console.log(error);
      }
    );
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/CF910341317/users?page=1&size=5&sortBy=&searchText="
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("GET");
  });
  it("should call addUser and  should return expected response", (done) => {
    const user: CFUser = params.user;
    const expectedData: AddUser = {
      message: "User Added",
      status: "OK",
      data: user,
    };
    service.addUser(user).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/users"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  it("should call editUser and  should return expected response", (done) => {
    const user: CFUser = params.user;
    const expectedData: AddUser = {
      message: "User Edited",
      status: "OK",
      data: user,
    };
    service.editUser(user).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/clinical-facilities/users"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("PUT");
  });
  it("should call EnableUser and  should return expected response", (done) => {
    const userId = "USR681255292";
    const expectedData: AddUser = {
      message: "User Enabled",
      status: "OK",
      data: params.user,
    };
    service.enableUser(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/users/USR681255292/enable"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  it("should call DisableUser and  should return expected response", (done) => {
    const userId = "USR681255292";
    const expectedData: AddUser = {
      message: "User Disabled",
      status: "OK",
      data: params.user,
    };
    service.disableUser(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/users/USR681255292/disable"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  it("should call getUser and  should return expected response", (done) => {
    const userId = "USR681255292";
    const expectedData: AddUser = {
      message: "User Disabled",
      status: "OK",
      data: params.user,
    };
    service.getUser(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/users/USR681255292"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("GET");
  });
  it("should call resetPassword and  should return expected response", (done) => {
    const userId = "USR681255292";
    const expectedData: AddUser = {
      message: "User Disabled",
      status: "OK",
      data: params.user,
    };
    service.resetPassword(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/users/USR681255292/reset-password"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  it("should call savePreferences and  should return expected response", (done) => {
    const userId = "USR681255292";
    const expectedData: AddUser = {
      message: "Preferences Saved",
      status: "OK",
      data: params.user,
    };
    let userPreference = {
      units: "",
      timeZone: "",
    };
    service.savePreferences(userId, userPreference).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(
      "https://dev2a.api.lifesignals.com/api/v1/resources/users/USR681255292/preferences"
    );
    testRequest.flush(expectedData);
    expect(testRequest.request.method).toEqual("POST");
  });
  // it('should call getTimeZone and  should return expected response', (done) => {
  //     let timeZones = [];
  //     service.getTimeZone().subscribe();
  //     const testRequest = httpTestingController.expectOne('../../../../assets/data/timeZone.json');
  //     testRequest.flush(timeZones);
  //     expect(testRequest.request.method).toEqual('GET');
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
