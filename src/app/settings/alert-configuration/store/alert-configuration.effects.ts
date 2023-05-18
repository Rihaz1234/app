import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, mergeMap } from "rxjs/operators";
import { AlertConfigurationsService } from "../services/alert-configuration.service";
import { AlertConfigurationActionTypes } from "./alert-configuration.types";
import {
  loadAlertConfigurationRequestAction,
  loadAlertConfigurationSuccessAction,
  loadAlertConfigurationFailureAction,
  loadDestinationAlertConfigurationFailureAction,
  loadDestinationAlertConfigurationRequestAction,
  loadDestinationAlertConfigurationSuccessAction,
  loadGroupDestinationAlertConfigurationRequestAction,
  loadGroupDestinationAlertConfigurationFailureAction,
  loadGroupDestinationAlertConfigurationSuccessAction,
  loadGroupAlertConfigurationFailureAction,
  loadGroupAlertConfigurationRequestAction,
  loadGroupAlertConfigurationSuccessAction,
  loadClinicalFacilityContactsRequestAction,
  loadClinicalFacilityContactsSuccessAction,
  loadClinicalFacilityContactsFailureAction,
  loadArrhythmiaAlertConfigurationRequestAction,
  loadArrhythmiaAlertConfigurationSuccessAction,
  loadArrhythmiaAlertConfigurationFailureAction,
} from "./alert-configuration.actions";

@Injectable()
export class AlertConfigurationEffects {
  constructor(
    private alertConfigurationService: AlertConfigurationsService,
    private actions$: Actions
  ) {}

  @Effect()
  loadAlertSettingsRequestEffect$ = this.actions$.pipe(
    ofType<loadAlertConfigurationRequestAction>(
      AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService.getAlertSettings(action.payload.url).pipe(
        map((data) => new loadAlertConfigurationSuccessAction({ data })),
        catchError((error) =>
          observableOf(new loadAlertConfigurationFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  loadGroupAlertSettingsRequestEffect$ = this.actions$.pipe(
    ofType<loadGroupAlertConfigurationRequestAction>(
      AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService
        .getGroupAlertSettings(action.payload.url)
        .pipe(
          map((data) => new loadGroupAlertConfigurationSuccessAction({ data })),
          catchError((error) =>
            observableOf(
              new loadGroupAlertConfigurationFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  loadArrhythmiaGroupAlertSettingsRequestEffect$ = this.actions$.pipe(
    ofType<loadArrhythmiaAlertConfigurationRequestAction>(
      AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService
        .getArrhythmiaGroupAlertSettings(action.payload.url)
        .pipe(
          map((data) => new loadArrhythmiaAlertConfigurationSuccessAction({ data })),
          catchError((error) =>
            observableOf(
              new loadArrhythmiaAlertConfigurationFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  loadDestinationAlertSettingsRequestEffect$ = this.actions$.pipe(
    ofType<loadDestinationAlertConfigurationRequestAction>(
      AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService
        .getAlertDestinationSettings(action.payload.url)
        .pipe(
          map(
            (data) =>
              new loadDestinationAlertConfigurationSuccessAction({ data })
          ),
          catchError((error) =>
            observableOf(
              new loadDestinationAlertConfigurationFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  loadGroupDestinationAlertSettingsRequestEffect$ = this.actions$.pipe(
    ofType<loadGroupDestinationAlertConfigurationRequestAction>(
      AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService
        .getGroupAlertDestinationSettings(action.payload.url)
        .pipe(
          map(
            (data) =>
              new loadGroupDestinationAlertConfigurationSuccessAction({ data })
          ),
          catchError((error) =>
            observableOf(
              new loadGroupDestinationAlertConfigurationFailureAction({ error })
            )
          )
        )
    )
  );

  @Effect()
  loadClinicalFacilityContactsRequestEffect$ = this.actions$.pipe(
    ofType<loadClinicalFacilityContactsRequestAction>(
      AlertConfigurationActionTypes.CF_CONATCT_LIST_REQUEST
    ),
    mergeMap((action) =>
      this.alertConfigurationService
        .getClinicalFacilityContacts(action.payload.url)
        .pipe(
          map(
            (data) => new loadClinicalFacilityContactsSuccessAction({ data })
          ),
          catchError((error) =>
            observableOf(
              new loadClinicalFacilityContactsFailureAction({ error })
            )
          )
        )
    )
  );
}
