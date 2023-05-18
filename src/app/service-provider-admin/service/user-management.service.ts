import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AddEditUserResponse,
  UserResponse,
} from "../../interfaces/user.interface";
import { AuthenticationService } from "@services/authentication.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserManagementService {
  spId: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.spId = this.authService.getLoggedUser().spId;
  }

  getUserList() {
    return this.httpClient
      .get<UserResponse>(
        environment.dataApiUrl + 'service-providers/' + this.spId + '/users'
      );
  }

  addUser(requestBody, url) {
    return this.httpClient
      .post<AddEditUserResponse>(
        environment.dataApiUrl + url,
        requestBody
      );
  }

  updateUser(requestBody, url) {
    return this.httpClient
      .put<AddEditUserResponse>(
        environment.dataApiUrl + url,
        requestBody
      );
  }

  enableDisable(endUrl, requestBody) {
    return this.httpClient
      .post<any>(endUrl, requestBody);
  }
}
