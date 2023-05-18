import { Injectable } from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import * as ClinicalFacilityActions from "./clinical-facility-management.actions";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import { of as observableOf } from "rxjs";
import { ClinicalFacilityService } from "../../service/clinical-facility.service";
import {
  LoadClinicalFacilityFailureAction,
  LoadClinicalFacilitySuccessAction,
  SaveClinicalFacilityFailureAction,
  SaveClinicalFacilitySuccessAction,
  UpdateClinicalFacilityFailureAction,
  UpdateClinicalFacilitySuccessAction,
} from "./clinical-facility-management.actions";

@Injectable()
export class ClinicalFacilityEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private clinicalFacilityService: ClinicalFacilityService
  ) {}

  loadClinicalFacility = createEffect(() => {
    return this.actions$.pipe(
      ofType<ClinicalFacilityActions.LoadClinicalFacilityRequestAction>(
        ClinicalFacilityActions.CfActionTypes.LOAD_CLINICAL_FACILITY_ACTION
      ),
      switchMap(
        (action: ClinicalFacilityActions.LoadClinicalFacilityRequestAction) => {
          return this.clinicalFacilityService.getClinicalFacilityList().pipe(
            map(
              (loadCFRes) =>
                new LoadClinicalFacilitySuccessAction(loadCFRes)
            ),
            catchError((error) =>
              observableOf(new LoadClinicalFacilityFailureAction(error))
            )
          );
        }
      )
    );
  });

  saveClinicalFacility = createEffect(() => {
    return this.actions$.pipe(
      ofType<ClinicalFacilityActions.SaveClinicalFacilityAction>(
        ClinicalFacilityActions.CfActionTypes.SAVE_CLINICAL_FACILITY_ACTION
      ),
      switchMap(
        (
          addClinicalFacility: ClinicalFacilityActions.SaveClinicalFacilityAction
        ) => {
          return this.clinicalFacilityService
            .addClinicalFacility(addClinicalFacility.payload)
            .pipe(
              map(
                (addAdminRes) =>
                  new SaveClinicalFacilitySuccessAction(addAdminRes.data)
              ),
              catchError((error) =>
                observableOf(new SaveClinicalFacilityFailureAction(error))
              )
            );
        }
      )
    );
  });

  updateClinicalFacility = createEffect(() => {
    return this.actions$.pipe(
      ofType<ClinicalFacilityActions.UpdateClinicalFacilityAction>(
        ClinicalFacilityActions.CfActionTypes.UPDATE_CLINICAL_FACILITY_ACTION
      ),
      switchMap(
        (
          updateClinicalFacility: ClinicalFacilityActions.UpdateClinicalFacilityAction
        ) => {
          return this.clinicalFacilityService
            .updateClinicalFacility(updateClinicalFacility.payload)
            .pipe(
              map(
                (updateClinicalFacilityRes) =>
                  new UpdateClinicalFacilitySuccessAction(
                    updateClinicalFacilityRes.data
                  )
              ),
              catchError((error) =>
                observableOf(new UpdateClinicalFacilityFailureAction(error))
              )
            );
        }
      )
    );
  });
  @Effect()
  loadAdminCloneUsersRequestEffect$ = this.actions$.pipe(
      ofType<ClinicalFacilityActions.LoadFacilityAdminCloneRequestAction>(
          ClinicalFacilityActions.CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_ACTION
      ),
      mergeMap((action) =>
          this.clinicalFacilityService.getClinicalFacilityAdminCloneUsers(action.payload.cfId).pipe(
              map((data) => new ClinicalFacilityActions.LoadFacilityAdminCloneSuccessAction({ data })),
              catchError((error) =>
                  observableOf(
                      new ClinicalFacilityActions.LoadFacilityAdminCloneFailureAction({ error })
                  )
              )
          )
      )
  );
}
