import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Store } from "@ngrx/store";
import {
  DischargePatientsStoreState,
  DischargePatientsStoreActions,
  DischargePatientsStoreSelectors,
} from "../store";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivePatient } from "src/app/active-patients/models/active-patients.model";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DischargePatientManagerService {
  BASE_URL: string = environment.dataApiUrl;
  dischargePatients$: Observable<DischargePatientsStoreState.State>;

  constructor(private store$: Store<DischargePatientsStoreState.State>, private http: HttpClient) { }

  fetch(url: string) {
    this.store$.dispatch(
      new DischargePatientsStoreActions.LoadDischargePatientsRequestAction({ url })
    );
  }

  getPatientBy(id) {
    let apiURL = `${this.BASE_URL}/patients/${id}`;
    return this.http
      .get<{ data: ActivePatient }>(apiURL)
      .pipe(catchError((err) => {
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
          errorMessage = `Error: ${err.error.message}`;
        } else {
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        return throwError(errorMessage);
      }));
  }

  selectDischargePatient() {
    this.dischargePatients$ = this.store$.select(
      DischargePatientsStoreSelectors.selectDischargePatientsList
    );
    return this.dischargePatients$;
  }
}
