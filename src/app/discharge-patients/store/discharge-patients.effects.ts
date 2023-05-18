import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap } from "rxjs/operators";
import { DischargePatientService } from "../service/discharge-patient.service";
import * as featureActions from "./discharge-patients.actions";

@Injectable()
export class DischargePatientsEffects {
  constructor(
    private dischargePatientsService: DischargePatientService,
    private actions$: Actions
  ) {}

  loadDischargedPatients = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.LoadDischargePatientsRequestAction>(
        featureActions.ActionTypes.LOAD_DISCHARGE_PATIENTS_REQUEST
      ),
      exhaustMap((action) =>
        this.dischargePatientsService.get(action.payload.url).pipe(
          map(
            (response) =>
              new featureActions.LoadDischargePatientsSuccessAction(response)
          ),
          catchError((error) =>
            of(new featureActions.LoadDischargePatientsFailureAction(error))
          )
        )
      )
    )
  );
}
