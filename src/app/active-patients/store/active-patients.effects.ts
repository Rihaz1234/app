import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf, of } from "rxjs";
import { catchError, map, startWith, mergeMap, switchMap } from "rxjs/operators";
import { ActivePatientsService } from "../services/active-patients.service";
import * as featureActions from "./active-patients.actions";

@Injectable()
export class ActivePatientsEffects {
  constructor(
    private activePatientsService: ActivePatientsService,
    private actions$: Actions
  ) { }

  loadActivePatientsRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.LoadActivePatientsRequestAction>(
        featureActions.ActionTypes.LOAD_ACTIVE_PATIENTS_REQUEST
      ),
      mergeMap((action) =>
        this.activePatientsService.getAll(action.payload.url).pipe(
          map(
            (response: any) =>
              new featureActions.LoadActivePatientsSuccessAction({
                data: {
                  patients: response?.data?.items,
                  total: response?.data?.total,
                },
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.LoadActivePatientsFailureAction({ error })
            )
          )
        )
      )
    )
  );

  loadUnAssignedPatientsRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.LoadUnassignedPatientsRequestAction>(
        featureActions.ActionTypes.LOAD_UNASSIGNED_PATIENTS_REQUEST
      ),
      mergeMap((action) =>
        this.activePatientsService.getUnassignedPatients(action.payload.url).pipe(
          map(
            (response: any) => new featureActions.LoadUnassignedPatientsSuccessAction({
              data: {
                items: response?.data?.items,
                total: response?.data?.total,
              },
            })),
          catchError((error) =>
            observableOf(
              new featureActions.LoadUnassignedPatientsFailureAction({ error })
            )
          )
        )
      )
    )
  );

  loadDoctorsRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.LoadDoctorsListRequestAction>(
        featureActions.ActionTypes.LOAD_DOCTORS_LIST_REQUEST
      ),
      startWith(new featureActions.LoadDoctorsListRequestAction()),
      mergeMap((action) =>
        this.activePatientsService.getDoctorsList().pipe(
          map(
            (doctors) =>
              new featureActions.LoadDoctorsListSuccessAction({ doctors })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.LoadDoctorsListFailureAction({ error })
            )
          )
        )
      )
    )
  );

  createNewPatientEffects$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.CreateNewPatientRequestAction>(
        featureActions.ActionTypes.CREATE_NEW_PATIENT_REQUEST
      ),
      // startWith(new featureActions.createNewPatientRequestAction()),
      mergeMap((data) =>
        this.activePatientsService.savePatient(data)
          .pipe(
            map(
              (newPatient) =>
                new featureActions.CreateNewPatientSuccessAction({ newPatient })
            ),
            catchError((error) =>
              observableOf(
                new featureActions.CreateNewPatientFailureAction({ error })
              )
            )
          )
      )
    )
  );

  updatePatientEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.UpdatePatientRequestAction>(
        featureActions.ActionTypes.UPDATE_PATIENT_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.updatePatient(data).pipe(
          map(
            (response) =>
              new featureActions.UpdatePatientSuccessAction({ updatedData: response.data })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.UpdatePatientFailureAction({ error })
            )
          )
        )
      )
    )
  );

  updatePatientGroupEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.AssignGroupRequestAction>(
        featureActions.ActionTypes.ASSIGN_GROUP_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.assignGroup(data).pipe(
          map(
            (response) =>
              new featureActions.AssignGroupSuccessAction({ updatedData: response })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.AssignGroupFailureAction({ error })
            )
          )
        )
      )
    )
  );

  stopMonitoringEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.StopMonitoringRequestAction>(
        featureActions.ActionTypes.STOP_MONITORING_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.stopProcedure(data.payload).pipe(
          map(
            (patient) =>
              new featureActions.StopMonitoringSuccessAction({ patient })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.StopMonitoringFailureAction({ error })
            )
          )
        )
      )
    )
  );

  dischargePatientEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.DischargePatientRequestAction>(
        featureActions.ActionTypes.DISCHARGE_PATIENT_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.dischargePatient(data.payload).pipe(
          map(
            (dischargedPatient) =>
              new featureActions.DischargePatientSuccessAction({
                dischargedPatient,
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.DischargePatientFailureAction({ error })
            )
          )
        )
      )
    )
  );

  setSelectedPatientIdsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.SetSelectedPatientIdsRequestAction>(
        featureActions.ActionTypes.SET_SELECTED_PATIENTS_IDs_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.setSelectedPatientIds(data.payload).pipe(
          map(
            (patientIds) =>
              new featureActions.SetSelectedPatientIdsSuccessAction({
                patientIds,
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.SetSelectedPatientIdsFailureAction({ error })
            )
          )
        )
      )
    )
  );

  setSelectedtabEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<featureActions.SetSelectedTabRequestAction>(
        featureActions.ActionTypes.SET_SELECTED_TAB_REQUEST
      ),
      mergeMap((data) =>
        this.activePatientsService.setSelectedTab(data.payload).pipe(
          map(
            (selectedTab) =>
              new featureActions.SetSelectedTabSuccessAction({
                selectedTab,
              })
          ),
          catchError((error) =>
            observableOf(
              new featureActions.SetSelectedTabFailureAction({ error })
            )
          )
        )
      )
    )
  );
}
