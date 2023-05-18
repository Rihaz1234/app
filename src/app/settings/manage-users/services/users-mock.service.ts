import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UsersMockService {
  constructor() {}
  enableUser(id) {
    let dummyData = new BehaviorSubject({});
    return dummyData.asObservable();
  }
  disableUser(id) {
    let dummyData = new BehaviorSubject({});
    return dummyData.asObservable();
  }
  getUser(id) {
    let userResponse = {
      message: "User Fetched",
      status: "OK",
      data: {
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
    let dummyData = new BehaviorSubject(userResponse);
    return dummyData.asObservable();
  }
  editUser(userData){
    let dummyData = new BehaviorSubject({});
    return dummyData.asObservable();
  }
  resetPassword(id) {
    let dummyData = new BehaviorSubject({
      data: null,
      status: "OK",
    });
    return dummyData.asObservable();
  }
  getGroups(cfid) {
    let dummyData = new BehaviorSubject({
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
    });
    return dummyData.asObservable();
  }
  savePreferences(userId, body) {
    let dummyData;
    if (userId !== null) {
      dummyData = new BehaviorSubject({
        data: null,
        status: "OK",
      });
    } else {
      dummyData = new BehaviorSubject({
        data: null,
        status: "NOTOK",
      });
    }
    return dummyData.asObservable();
  }
  getTimeZone() {
    const timeZones = [
      {
        offset: "GMT-12:00",
        name: "Etc/GMT-12",
      },
      {
        offset: "GMT-11:00",
        name: "Etc/GMT-11",
      },
    ];
    let dummyData = new BehaviorSubject(timeZones);
    return dummyData.asObservable();
  }
}
