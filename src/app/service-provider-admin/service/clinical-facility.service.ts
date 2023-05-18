import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AddEditClinicalFacilityResponse,
  ClinicalFacilityResponse,
} from "../clinical-facility-management/clinical-facility.interface";
import { AuthenticationService } from "@services/authentication.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClinicalFacilityService {
  spId: string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.spId = this.authService.getLoggedUser().spId;
  }

  getClinicalFacilityList() {
    return this.httpClient
      .get<ClinicalFacilityResponse>(
        environment.dataApiUrl + 'service-providers/' + this.spId + '/clinical-facilities'
      );
  }
  getClinicalFacilityAdminCloneUsers(cfId) {
    return this.httpClient
        .get<ClinicalFacilityResponse>(
            environment.dataApiUrl + 'clinical-facilities/'+ cfId+'/users/cfac'
        );
  }

  addClinicalFacility(requestBody) {
    return this.httpClient
      .post<AddEditClinicalFacilityResponse>(
        environment.dataApiUrl + 'clinical-facilities/',
        requestBody
      );
  }

  updateClinicalFacility(requestBody) {
    return this.httpClient
      .put<AddEditClinicalFacilityResponse>(
        environment.dataApiUrl + 'clinical-facilities/',
        requestBody
      );
  }
}
