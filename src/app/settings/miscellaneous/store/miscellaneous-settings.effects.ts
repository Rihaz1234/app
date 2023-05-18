import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, mergeMap } from "rxjs/operators";
import * as featureActions from "./miscellaneous-settings.actions";
import { MiscellaneousSettingsService } from "../services/miscellaneous-settings.service";

@Injectable()
export class MiscellaneousSettingsEffects {
  constructor(
    private miscellaneousSettingsService: MiscellaneousSettingsService,
    private actions$: Actions
  ) {}


  @Effect()
  loadSpo2SettingsRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.loadSpo2SettingsRequestAction>(
      featureActions.ActionTypes.LOAD_SPO2_SETTINGS_REQUEST
    ),
    mergeMap((action) =>
      this.miscellaneousSettingsService.getSpo2Settings(action.payload.url).pipe(
        map(
          (data) =>
            new featureActions.loadSpo2SettingsSuccessAction({ data })
        ),
        catchError((error) =>
          observableOf(
            new featureActions.loadSpo2SettingsFailureAction({ error })
          )
        )
      )
    )
  );


  @Effect()
  loadMiscellaneousSettingsRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.loadMiscellaneousSettingsRequestAction>(
      featureActions.ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST
    ),
    mergeMap((action) =>
      this.miscellaneousSettingsService.getSettings(action.payload.url).pipe(
        map(
          (data) =>
            new featureActions.loadMiscellaneousSettingsSuccessAction({ data })
        ),
        catchError((error) =>
          observableOf(
            new featureActions.loadMiscellaneousSettingsFailureAction({ error })
          )
        )
      )
    )
  );
  @Effect()
  updateSpo2SettingsRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.updateSpo2SettingsRequestAction>(
      featureActions.ActionTypes.UPDATE_SPO2_SETTINGS_REQUEST
    ),
    mergeMap((action) =>
      this.miscellaneousSettingsService
        .updateSpo2Settings(action.payload.data.data, action.payload.url)
        .pipe(
          map(
            (data) =>
              new featureActions.updateSpo2SettingsSuccessAction({
                data,
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.updateSpo2SettingsFailureAction({
                error,
              })
            )
          )
        )
    )
  );
  @Effect()
  updateMiscellaneousSettingsRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.updateMiscellaneousSettingsRequestAction>(
      featureActions.ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_REQUEST
    ),
    mergeMap((action) =>
      this.miscellaneousSettingsService
        .updateSettings(action.payload.data)
        .pipe(
          map(
            (data) =>
              new featureActions.updateMiscellaneousSettingsSuccessAction({
                data,
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.updateMiscellaneousSettingsFailureAction({
                error,
              })
            )
          )
        )
    )
  );
  @Effect()
  resetMiscellaneousSettingsRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.resetMiscellaneousSettingsRequestAction>(
      featureActions.ActionTypes.RESET_MISCELLANEOUS_SETTINGS_REQUEST
    ),
    mergeMap((action) =>
      this.miscellaneousSettingsService.resetSettings(action.payload.url).pipe(
        map(
          (data) =>
            new featureActions.resetMiscellaneousSettingsSuccessAction({ data })
        ),
        catchError((error) =>
          observableOf(
            new featureActions.resetMiscellaneousSettingsFailureAction({
              error,
            })
          )
        )
      )
    )
  );

}
