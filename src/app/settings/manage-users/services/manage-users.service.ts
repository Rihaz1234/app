import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  AddUser,
  CFUser,
  CFUserList,
} from "../../../interfaces/manage-users.interface";

@Injectable()
export class ManageUsersService {
  constructor(private http: HttpClient) { }
  getAdminUsersList(param) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    let params = new HttpParams();

    // Begin assigning parameters
    const url = param.url;
    params = params.append("page", param.page);
    params = params.append("size", param.size);
    params = params.append("sortBy", param.sortBy);
    params = params.append("searchText", param.searchText);
    return this.http
      .get<CFUserList>(environment.dataApiUrl + url, { params })
      .pipe(delay(100), catchError(this.handleError));
  }
  addUser(userData) {
    console.log("adduserData", userData);
    const url = "clinical-facilities/users";
    return this.http
      .post<AddUser>(environment.dataApiUrl + url, userData)
      .pipe(delay(100), catchError(this.handleError));
  }
  editUser(userData) {
    console.log("edituserData", userData);
    const url = "clinical-facilities/users";
    return this.http
      .put<AddUser>(environment.dataApiUrl + url, userData)
      .pipe(delay(100), catchError(this.handleError));
  }
  enableUser(userId) {
    const url = "users/" + userId + "/enable";
    return this.http
      .post(environment.dataApiUrl + url, "")
      .pipe(delay(100), catchError(this.handleError));
  }
  disableUser(userId) {
    const url = "users/" + userId + "/disable";
    return this.http
      .post(environment.dataApiUrl + url, "")
      .pipe(delay(100), catchError(this.handleError));
  }
  getUser(userId) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    const url = "users/" + userId;
    return this.http
      .get(environment.dataApiUrl + url, { headers: authHeaders })
      .pipe(delay(100), catchError(this.handleError));
  }
  resetPassword(userId) {
    const url = "users/" + userId + "/reset-password";
    return this.http
      .post(environment.dataApiUrl + url, "")
      .pipe(delay(100), catchError(this.handleError));
  }
  savePreferences(userId, body) {
    const url = "users/" + userId + "/preferences";
    return this.http
      .post(environment.dataApiUrl + url, body)
      .pipe(delay(100), catchError(this.handleError));
  }
  handleError(error: any) {
    console.log("error", error);
    let errorMessage = "";
    // Client-side error.
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      // Server-side error.
    } else {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
  getGroups(cfId) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    const url = "clinical-facilities/" + cfId + "/groups?sortBy=name:asc";
    return this.http
      .get<any>(environment.dataApiUrl + url, { headers: authHeaders })
      .pipe(delay(100), catchError(this.handleError));
  }
  getUserPreferences(userId) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    const url = "users/" + userId;
    this.http.get(environment.dataApiUrl + url, { headers: authHeaders })
      .subscribe((response: any) => {
        if (response.status === 'Ok') {
          return {
            units: response?.data?.units || '',
            timeZone: response?.data?.timezone || '',
          };
        } else {
          return '';
        }
      })
  }

  getTimeZoneOffset(tz: string) {
    const date = new Date();
    let offset: Array<string>;
    try {
      offset = date.toLocaleTimeString("en-US", {
        // @ts-ignore
        timeZoneName: "longOffset",
        timeZone: tz
      }).split(' ');
    } catch {
      offset = date.toLocaleTimeString("en-US", {
        // @ts-ignore
        timeZoneName: "longOffset"
      }).split(' ');
    }
    return offset[offset.length - 1];
  }

  editGroups(userData) {
    console.log("edituserData", userData);
    const url = "clinical-facilities/users/groups";
    return this.http
        .post<AddUser>(environment.dataApiUrl + url, userData)
        .pipe(delay(100), catchError(this.handleError));
  }
}

export class MockManageUsersService {
  getUser(id): Observable<{ data: CFUser }> {
    return of({
      data: {
        id: "",
        firstName: "First name",
        lastName: "Last name",
        email: "email@address.com",
        createdDateTime: "",
        facilityId: "",
        isActive: true,
        phoneNo: 0,
        roles: [],
        serviceProviderId: "",
        timezone: "",
        units: ""
      }
    })
  }

  getBrowserTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return 'GMT' + (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }

  savePreferences(id, preference) {
    return of({
      status: "OK",
      message: "Saved successfully"
    });
  }

  resetPassword(id) {
    return of({ status: "OK" });
  }

  getAdminUsersList(): Observable<CFUserList> {
    return of({
      data: {
        items: [],
        total: 0
      },
      message: "LOADED",
      status: "OK"
    });
  }
}
