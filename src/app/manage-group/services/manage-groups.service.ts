import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "@services/authentication.service";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Group } from "../models/manage-groups.model";
import { environment } from "src/environments/environment";
import { GetAPIResponse } from "src/app/models/api.model";

@Injectable({
  providedIn: "root",
})
export class ManageGroupsService {
  BASE_URL: string = environment.dataApiUrl;
  private cfId: string = "";
  constructor(
    private http: HttpClient,
    private autheticationService: AuthenticationService
  ) {
    this.cfId = this.autheticationService.getCfId();
  }

  save(ob) {
    let url = this.BASE_URL + "clinical-facilities/groups";
    return this.http.post<Group>(url, ob).pipe(catchError(this.handleError));
  }

  update(ob) {
    let url = this.BASE_URL + "clinical-facilities/groups";
    return this.http.put<Group>(url, ob).pipe(catchError(this.handleError));
  }

  remove(ob) {
    let url = this.BASE_URL + `clinical-facilities/groups/${ob}`;
    return this.http.delete<Group>(url).pipe(catchError(this.handleError));
  }

  fetch() {
    let url = this.BASE_URL + `clinical-facilities/${this.cfId}/groups?sortBy=name:asc`;
    return this.http.get<GetAPIResponse>(url).pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    if (error.errorMessage) {
      return throwError(error.errorMessage);
    } else {
      return throwError(`Error: ${error}`);
    }
  }
}
