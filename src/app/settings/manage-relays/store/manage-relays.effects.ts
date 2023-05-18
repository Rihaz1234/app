import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, mergeMap } from "rxjs/operators";
import * as featureActions from "./manage-relays.actions";
import { ManageRelaysService } from "../services/manage-relays.service";

@Injectable()
export class ManageRelaysEffects {
  constructor(
    private manageRelayService: ManageRelaysService,
    private actions$: Actions
  ) {}

  @Effect()
  loadSPRelayListRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.LoadSPRelaysRequestAction>(
      featureActions.ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_REQUEST
    ),
    mergeMap((action) =>
      this.manageRelayService.getSPRelayList(action.payload.params).pipe(
        map((data) => new featureActions.LoadSPRelaysSuccessAction({ data })),
        catchError((error) =>
          observableOf(new featureActions.LoadSPRelaysFailureAction({ error }))
        )
      )
    )
  );
  @Effect()
  loadMPRelayListRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.LoadMPRelaysRequestAction>(
      featureActions.ActionTypes.LOAD_MULTI_PATIENT_RELAYS_REQUEST
    ),
    mergeMap((action) =>
      this.manageRelayService.getMPRelayList(action.payload.params).pipe(
        map((data) => new featureActions.LoadMPRelaysSuccessAction({ data })),
        catchError((error) =>
          observableOf(new featureActions.LoadMPRelaysFailureAction({ error }))
        )
      )
    )
  );
  @Effect()
  loadRelayConfigurationEffect$ = this.actions$.pipe(
    ofType<featureActions.LoadRelayConfigurationRequestAction>(
      featureActions.ActionTypes.LOAD_RELAY_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.manageRelayService.getRelayConif().pipe(
        map(
          (data) =>
            new featureActions.LoadRelayConfigurationSuccessAction({ data })
        ),
        catchError((error) =>
          observableOf(
            new featureActions.LoadRelayConfigurationFailureAction({ error })
          )
        )
      )
    )
  );
  @Effect()
  loadCGRelayListRequestEffect$ = this.actions$.pipe(
      ofType<featureActions.LoadCGRelaysRequestAction>(
          featureActions.ActionTypes.LOAD_CARE_GIVER_RELAYS_REQUEST
      ),
      mergeMap((action) =>
          this.manageRelayService.getCGRelayList(action.payload.params).pipe(
              map((data) => new featureActions.LoadCGRelaysSuccessAction({ data })),
              catchError((error) =>
                  observableOf(new featureActions.LoadCGRelaysFailureAction({ error }))
              )
          )
      )
  );
}
