import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import {catchError, map, startWith, mergeMap, switchMap} from 'rxjs/operators';
import { AlertConfigurationsService } from '../services/alert-configuration.service';
import { AlertConfigurationActionTypes } from './alert-configuration.types';

import {
    loadAlertConfigurationRequestAction,
    loadAlertConfigurationSuccessAction,
    loadAlertConfigurationFailureAction,
    loadDestinationAlertConfigurationFailureAction,
    loadDestinationAlertConfigurationRequestAction,
    loadDestinationAlertConfigurationSuccessAction,
    loadClinicalFacilityContactsRequestAction,
    loadClinicalFacilityContactsSuccessAction,
    loadClinicalFacilityContactsFailureAction,
    loadMiscellaneousSettingsFailureAction,
    loadMiscellaneousSettingsSuccessAction,
    loadMiscellaneousSettingsRequestAction,
    loadArrhythmiaAlertConfigurationRequestAction,
    loadArrhythmiaAlertConfigurationSuccessAction,
    loadArrhythmiaAlertConfigurationFailureAction,
    updateMiscellaneousSettingsFailureAction,
    updateMiscellaneousSettingsSuccessAction,
    updateMiscellaneousSettingsRequestAction,
    resetMiscellaneousSettingsFailureAction,
    resetMiscellaneousSettingsSuccessAction,
    resetMiscellaneousSettingsRequestAction,
    LoadAlertHistoryRequestAction
} from './alert-configuration.actions';

import * as featureActions from './alert-configuration.actions';
import {AlertHistory, AlertHistoryData, EventList} from "./alert-configuration.models";

@Injectable()
export class AlertConfigurationEffects {
    constructor(
        private alertConfigurationService: AlertConfigurationsService,
        private actions$: Actions
    ) { }

    @Effect()
    loadArrhythmiaAlertSettingsRequestEffect$ = this.actions$.pipe(
      ofType<loadArrhythmiaAlertConfigurationRequestAction>(
        AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_REQUEST
      ),
      switchMap((action) =>
        this.alertConfigurationService.getArrhythmiaAlertSettings(action.payload.url).pipe(
          map((data) => new loadArrhythmiaAlertConfigurationSuccessAction({ data })),
          catchError((error) =>
            observableOf(new loadArrhythmiaAlertConfigurationFailureAction({ error }))
          )
        )
      )
    );
    
    @Effect()
    loadAlertSettingsRequestEffect$ = this.actions$.pipe(
      ofType<loadAlertConfigurationRequestAction>(
        AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_REQUEST
      ),
      switchMap((action) =>
        this.alertConfigurationService.getAlertSettings(action.payload.url).pipe(
          map((data) => new loadAlertConfigurationSuccessAction({ data })),
          catchError((error) =>
            observableOf(new loadAlertConfigurationFailureAction({ error }))
          )
        )
      )
    );
    
    @Effect()
    loadDestinationAlertSettingsRequestEffect$ = this.actions$.pipe(
        ofType<loadDestinationAlertConfigurationRequestAction>(
            AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_REQUEST
        ),
        switchMap(action =>
            this.alertConfigurationService.getAlertDestinationSettings(action.payload.url).pipe(
                map(
                    data => new loadDestinationAlertConfigurationSuccessAction({ data })
                ),
                catchError(error =>
                    observableOf(new loadDestinationAlertConfigurationFailureAction({ error }))
                )
            )
          )
      );
   
  @Effect()
  loadClinicalFacilityContactsRequestEffect$ = this.actions$.pipe(
    ofType<loadClinicalFacilityContactsRequestAction>(
      AlertConfigurationActionTypes.CF_CONATCT_LIST_REQUEST
    ),
      switchMap((action) =>
      this.alertConfigurationService
        .getClinicalFacilityContacts(action.payload.url)
        .pipe(
          map(
            (data) => new loadClinicalFacilityContactsSuccessAction({ data })
          ),
          catchError((error) =>
            observableOf(
              new loadClinicalFacilityContactsFailureAction({ error }))
            )
          )
        )
    );

    @Effect()
    loadMiscellaneousSettingsRequestEffect$ = this.actions$.pipe(
        ofType<loadMiscellaneousSettingsRequestAction>(
            AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST
        ),
        switchMap(action =>
            this.alertConfigurationService.getSettings(action.payload.url).pipe(
                map(
                    data => new loadMiscellaneousSettingsSuccessAction({data})
                ),
                catchError(error =>
                    observableOf(new loadMiscellaneousSettingsFailureAction({error}))
                )
            )
        )
      );
    @Effect()
    loadAlertHistoryRequestEffect$ = this.actions$.pipe(
        ofType<featureActions.LoadAlertHistoryRequestAction>(
            AlertConfigurationActionTypes.ALERT_HISTORY_REQUEST
        ),
        switchMap((action) =>
            this.alertConfigurationService.alertHistory(action.payload.params).pipe(
                map((data:AlertHistory) => new featureActions.LoadAlertHistorySuccessAction({ data })),
                catchError((error) =>
                    observableOf(
                        new featureActions.LoadAlertHistoryFailureAction({ error })
                    )
                )
            )
        )
    );
    @Effect()
    loadEventListRequestEffect$ = this.actions$.pipe(
        ofType<featureActions.LoadEventListRequestAction>(
            AlertConfigurationActionTypes.EVENT_LIST_REQUEST
        ),
        switchMap((action) =>
            this.alertConfigurationService.eventList(action.payload.params).pipe(
                map((data:EventList) => new featureActions.LoadEventListSuccessAction({ data })),
                catchError((error) =>
                    observableOf(
                        new featureActions.LoadEventListFailureAction({ error })
                    )
                )
            )
        )
    );
}

