import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  MPRelayList,
  SPRelayList,
  UpdateRelay,
} from "../../../interfaces/manage-relays.interface";

@Injectable()
export class ManageRelaysService {
  constructor(private http: HttpClient) {}
  sendOtpQr(body) {
    let url = "relays/generate-otp";
    return this.http.post<any>(environment.dataApiUrl + url, body);
  }
  createSPR() {
    let url = "relays/spr";
    let body = {
      facilityId: "CF910341317",
      email: "test2@test.com",
      phoneNo: "1234567895",
    };
    return this.http.post<UpdateRelay>(
      environment.dataApiUrl + url,
      body
    );
  }
  getSPRelayList(param) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    let params = new HttpParams();

    // Begin assigning parameters
    let url = "relays/list";
    params = params.append("relayType", "SPR");
    params = params.append("page", param.page);
    params = params.append("size", param.size);
    params = params.append("sortBy", param.sortBy);
    params = params.append("searchText", param.searchText);
    // params = params.append("searchText", param.searchText);
    return this.http
      .get<SPRelayList>(environment.dataApiUrl + url, {
        params,
      })
      .pipe(delay(100), catchError(this.handleError));
  }
  getMPRelayList(param) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    let params = new HttpParams();

    // Begin assigning parameters
    let url = "relays/list";
    params = params.append("relayType", "MPR");
    params = params.append("page", param.page);
    params = params.append("size", param.size);
    params = params.append("sortBy", param.sortBy);
    params = params.append("searchText", param.searchText);
    // params = params.append("searchText", param.searchText);
    return this.http
      .get<MPRelayList>(environment.dataApiUrl + url, {
        params,
      })
      .pipe(delay(100), catchError(this.handleError));
  }
  updateRelay(relay) {
    let url = "relays/mpr/otp";
    return this.http.post<UpdateRelay>(
      environment.dataApiUrl + url,
      relay
    );
  }
  deleteRelays(relayIds) {
    console.log("relayIds", relayIds);
    let url = "relays/delete";
    return this.http.post<any>(environment.dataApiUrl + url, relayIds);
  }
  addRelay(location) {
    let url = "relays/mpr/otp";
    return this.http.post<any>(environment.dataApiUrl + url, location);
  }
  getRelayConif() {
    let url = "relays/config";
    return this.http
      .get<any>(environment.dataApiUrl + url)
      .pipe(delay(100), catchError(this.handleError));
  }
  updateRelayConif(config) {
    let url = "relays/config";
    return this.http
      .post<any>(environment.dataApiUrl + url, config)
      .pipe(delay(100), catchError(this.handleError));
  }
  getCGRelayList(param) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    let params = new HttpParams();

    // Begin assigning parameters
    let url = "relays/list";
    params = params.append("relayType", "CGA");
    params = params.append("page", param.page);
    params = params.append("size", param.size);
    params = params.append("sortBy", param.sortBy);
    params = params.append("searchText", param.searchText);
    // params = params.append("searchText", param.searchText);
    return this.http
        .get<SPRelayList>(environment.dataApiUrl + url, {
          params,
        })
        .pipe(delay(100), catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = "";
    // Client-side error.
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      // Server-side error.
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  alphaNumericsOnly(event: KeyboardEvent) {
    console.log(event);
    let charsOnlyPattern = /^[a-zA-Z0-9-_ ]+$/;
    let key = event.key;
    if (charsOnlyPattern.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
