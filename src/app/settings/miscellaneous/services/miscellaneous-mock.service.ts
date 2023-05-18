import { Injectable } from "@angular/core";
import { BehaviorSubject,of} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiscellaneousMockService {
  constructor() { }
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
  getSignedUrl(body) {
    let dummyData = new BehaviorSubject({
      data: "https://webui-s3.s3.ap-south-1.amazonaws.com/CF910341317/CliniMateTM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYO3SOWE22TOP24VY%2F20220120%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220120T055338Z&X-Amz-Expires=120&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-id=PutObject&X-Amz-Signature=b056355a51d4742b464571dbe2c64636d2955a24a5f80ad5d5138a12b5067f8a",
      status: "OK",
    });
    return dummyData.asObservable();
  }
  uploadImage(url, file) {
    let dummyData = new BehaviorSubject({});
    return dummyData.asObservable();
  }
  updateSettings(obj) {
    return of({})
  }
}
