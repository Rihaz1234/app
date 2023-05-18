import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { ManageAdminService } from "../../_services/manage-admin.service";
import * as ManageAdminActions from "./manage-admin.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import {
  ActiveManageAdminFailureAction,
  ActiveManageAdminSuccessAction,
  InactiveManageAdminFailureAction,
  InactiveManageAdminSuccessAction,
  LoadManageAdminFailureAction,
  LoadManageAdminSuccessAction,
  SaveManageAdminFailureAction,
  SaveManageAdminSuccessAction,
  UpdateManageAdminFailureAction,
  UpdateManageAdminSuccessAction,
} from "./manage-admin.actions";
import { of as observableOf } from "rxjs";

@Injectable()
export class ManageAdminEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private manageAdminService: ManageAdminService
  ) {}

  loadAdmin = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageAdminActions.LoadManageAdminRequestAction>(
        ManageAdminActions.ManageAdminActionTypes.LOAD_MANAGE_ADMIN_ACTION
      ),
      switchMap((action: ManageAdminActions.LoadManageAdminRequestAction) => {
        return this.manageAdminService.getAllAdminList(action.payload).pipe(
          map(
            (loadAdminRes) =>
              new LoadManageAdminSuccessAction(loadAdminRes.data)
          ),
          catchError((error) =>
            observableOf(new LoadManageAdminFailureAction(error))
          )
        );
      })
    );
  });

  saveAdmin = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageAdminActions.SaveManageAdminAction>(
        ManageAdminActions.ManageAdminActionTypes.SAVE_MANAGE_ADMIN_ACTION
      ),
      switchMap((addAdmin: ManageAdminActions.SaveManageAdminAction) => {
        return this.manageAdminService
          .addAdmin(addAdmin.endUrl, addAdmin.payload)
          .pipe(
            map(
              (addAdminRes) =>
                new SaveManageAdminSuccessAction(addAdminRes.data)
            ),
            catchError((error) =>
              observableOf(new SaveManageAdminFailureAction(error))
            )
          );
      })
    );
  });

  updateAdmin = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageAdminActions.UpdateManageAdminAction>(
        ManageAdminActions.ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_ACTION
      ),
      switchMap((updateAdmin: ManageAdminActions.UpdateManageAdminAction) => {
        return this.manageAdminService
          .updateAdmin(updateAdmin.endUrl, updateAdmin.payload)
          .pipe(
            map(
              (updateAdminRes) =>
                new UpdateManageAdminSuccessAction(updateAdminRes.data)
            ),
            catchError((error) =>
              observableOf(new UpdateManageAdminFailureAction(error))
            )
          );
      })
    );
  });

  inActiveAdmin = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageAdminActions.InactiveManageAdminAction>(
        ManageAdminActions.ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN
      ),
      switchMap(
        (inActiveAdmin: ManageAdminActions.InactiveManageAdminAction) => {
          return this.manageAdminService
            .activeInactive(inActiveAdmin.endUrl, {})
            .pipe(
              map(
                (inActiveAdminRes) =>
                  new InactiveManageAdminSuccessAction(inActiveAdmin.id)
              ),
              catchError((error) =>
                observableOf(new InactiveManageAdminFailureAction(error))
              )
            );
        }
      )
    );
  });

  activeAdmin = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageAdminActions.ActiveManageAdminAction>(
        ManageAdminActions.ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN
      ),
      switchMap((activeAdmin: ManageAdminActions.ActiveManageAdminAction) => {
        return this.manageAdminService
          .activeInactive(activeAdmin.endUrl, {})
          .pipe(
            map(
              (activeAdminRes) =>
                new ActiveManageAdminSuccessAction(activeAdmin.id)
            ),
            catchError((error) =>
              observableOf(new ActiveManageAdminFailureAction(error))
            )
          );
      })
    );
  });
}
