import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RelaysMockService {

  constructor() {}
  deleteRelays(){
    let dummyData = new BehaviorSubject({
      data: null,
      status: "OK",
    });
    return dummyData.asObservable();
  }
  deleteSingleRelay(relayId){
    let dummyData = new BehaviorSubject({
      data: null,
      status: "OK",
    });
    return dummyData.asObservable();
  }
  getSPRelayList() {
    let dummyData = new BehaviorSubject({
      data: [{
        relayId: "R594418589",
        BiosensorID: "",
        createdBy: "",
        email: "",
        phoneNo: "",
        createdDateTime: "",
        lastActive: "",
        relayType: "",
        expiryDate: ""
      }],
      status: "OK",
    });
    return dummyData.asObservable();
  }
  getMPRelayList() {
    let dummyData = new BehaviorSubject({
      data:[{
        relayId: "R594418589",
        location: "Ward1234",
        createdBy: "USR247522464",
        createdDateTime: "2022-03-21 04:54:26",
        status: "Active",
        lastActive: 1647838466000,
      }],
      status: "OK",
    });
    return dummyData.asObservable();
  }
  updateRelay(relay){
    let dummyData = new BehaviorSubject({
      data: [{
        relayId: "R594418589",
        location: "Ward1234",
        createdBy: "USR247522464",
        createdDateTime: "2022-03-21 04:54:26",
        status: "Active",
        lastActive: 1647838466000,
      }],
      status: "OK",
    });
    return dummyData.asObservable();
  } 
  save(relay) {
    let dummyData = new BehaviorSubject({});
    return dummyData.asObservable();
  }
  addRelay(location) {
    let dummyData = new BehaviorSubject({
      data: [{
        relayId: "R594418589",
        location: "Ward1234",
        createdBy: "USR247522464",
        createdDateTime: "2022-03-21 04:54:26",
        status: "Active",
        lastActive: 1647838466000,
      }],
      status: "OK",
    });
    return dummyData.asObservable();
  }
  sendOtpQr(body) {
    let dummyData = new BehaviorSubject({ 
      data: null,   
      message: "OTP_QR_CODE_SENT",
      status: "OK",
    });
    return dummyData.asObservable();
  }
}
