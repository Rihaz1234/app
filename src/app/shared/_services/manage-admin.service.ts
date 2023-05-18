import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  AddEditUserResponse,
  UserResponse,
} from "../../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class ManageAdminService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getAllAdminList(endUrl: string) {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    return this.httpClient
      .get<UserResponse>(endUrl, { headers: authHeaders });
  }

  addAdmin(endUrl, requestBody) {
    return this.httpClient
      .post<AddEditUserResponse>(endUrl, requestBody);
  }

  updateAdmin(endUrl, requestBody) {
    return this.httpClient
      .put<AddEditUserResponse>(endUrl, requestBody);
  }

  activeInactive(endUrl, requestBody) {
    return this.httpClient
      .post<any>(endUrl, requestBody);
  }
}
