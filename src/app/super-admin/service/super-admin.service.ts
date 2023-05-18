import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  AddEditServiceProviderResponse,
  ServiceProviderResponse,
} from "../manage-service-provider/service-provider.interface";
import { environment } from "src/environments/environment";
import {UserResponse} from "../../interfaces/user.interface";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable()
export class SuperAdminService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllServiceProvider() {
    const authHeaders = new HttpHeaders({
      "X-Skip-Interceptor": "",
      "Access-Control-Allow-Origin": "*",
    });
    return this.httpClient
      .get<ServiceProviderResponse>(
        environment.dataApiUrl + 'service-providers/',
        { headers: authHeaders }
      );
  }

  addServiceProvider(requestBody) {
    return this.httpClient
      .post<AddEditServiceProviderResponse>(
        environment.dataApiUrl + 'service-providers/',
        requestBody
      );
  }

  updateServiceProvider(requestBody) {
    return this.httpClient
      .put<AddEditServiceProviderResponse>(
        environment.dataApiUrl + 'service-providers/',
        requestBody
      );
  }
  getSPACloneUsers(url) {
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
