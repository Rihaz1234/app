import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  MiscellaneousData,
  MiscSettings,
  spo2ConfigData,
  spo2Data,
} from "../../../interfaces/misc-settings.interface";

@Injectable()
export class MiscellaneousSettingsService {
  constructor(private http: HttpClient) {}
  getSettings(url) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    return this.http.get<MiscSettings>(environment.dataApiUrl + url, {
      headers: authHeaders,
    });
  }

  getEmrList() {
    const url = "info/emr/list"
    return this.http
      .get(environment.dataApiUrl + url).pipe(delay(100), catchError(this.handleError));
  }

  getSpo2Settings(url) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    return this.http.get<spo2ConfigData>(environment.dataApiUrl + url, {
      headers: authHeaders,
    });
  }

  updateSettings(body: MiscellaneousData) {
    const url = "clinical-facilities/misc-settings";
    console.log("update", body);
    return this.http
      .post<any>(environment.dataApiUrl + url, body)
      .pipe(delay(100), catchError(this.handleError));
  }

  updateSpo2Settings(body: spo2Data,url) {
    console.log("update", body);
    return this.http
      .post<any>(environment.dataApiUrl + url, body)
      .pipe(delay(100), catchError(this.handleError));
  }

  resetSettings(url) {
    return this.http
      .post<any>(environment.dataApiUrl + url, "")
      .pipe(delay(100), catchError(this.handleError));
  }

  resetSpo2Settings(url) {
    return this.http
      .post<any>(environment.dataApiUrl + url, "")
      .pipe(delay(100), catchError(this.handleError));
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
  getSignedUrl(body) {
    const url = "files/upload-url";
    return this.http
      .post<any>(environment.dataApiUrl + url, body)
      .pipe(delay(100), catchError(this.handleError));
  }
  uploadImage(url, file) {
    const authHeaders = new HttpHeaders({
      "x-amz-acl": "public-read",
    });
    return this.http.put(url, file, { headers: authHeaders });
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
}
