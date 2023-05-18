import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";
import { DischargePatient } from "../models/discharge-patient.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DischargePatientService {
  BASE_URL: string = environment.dataApiUrl;

  constructor(private http: HttpClient) {}

  get(apiurl: string) {
    let url =
      this.BASE_URL +apiurl;
      
    return this.http
      .get<{ items: DischargePatient[]; total: number }>(url)
      .pipe(catchError(this.handleError));
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
