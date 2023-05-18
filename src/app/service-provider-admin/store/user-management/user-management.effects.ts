import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import * as UserManagementActions from "./user-management.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of as observableOf } from "rxjs";
import { UserManagementService } from "../../service/user-management.service";
import {
  DisableUserFailureAction,
  DisableUserSuccessAction,
  EnableUserFailureAction,
  EnableUserSuccessAction,
  LoadUserManagementFailureAction,
  LoadUserManagementSuccessAction,
  SaveUserManagementFailureAction,
  SaveUserManagementSuccessAction,
  UpdateUserManagementFailureAction,
  UpdateUserManagementSuccessAction,
} from "./user-management.actions";

@Injectable()
export class UserManagementEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userManagementService: UserManagementService
  ) {}

  loadUser = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserManagementActions.LoadUserManagementRequestAction>(
        UserManagementActions.UserManagementActionTypes
          .LOAD_USER_MANAGEMENT_ACTION
      ),
      switchMap(
        (action: UserManagementActions.LoadUserManagementRequestAction) => {
          return this.userManagementService.getUserList().pipe(
            map(
              (loadUserRes) =>
                new LoadUserManagementSuccessAction(loadUserRes.data)
            ),
            catchError((error) =>
              observableOf(new LoadUserManagementFailureAction(error))
            )
          );
        }
      )
    );
  });

  saveUser = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserManagementActions.SaveUserManagementAction>(
        UserManagementActions.UserManagementActionTypes
          .SAVE_USER_MANAGEMENT_ACTION
      ),
      switchMap((addUser: UserManagementActions.SaveUserManagementAction) => {
        return this.userManagementService.addUser(addUser.payload, addUser.Url).pipe(
          map(
            (addUserRes) => new SaveUserManagementSuccessAction(addUserRes.data)
          ),
          catchError((error) =>
            observableOf(new SaveUserManagementFailureAction(error))
          )
        );
      })
    );
  });

  updateUser = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserManagementActions.UpdateUserManagementAction>(
        UserManagementActions.UserManagementActionTypes
          .UPDATE_USER_MANAGEMENT_ACTION
      ),
      switchMap(
        (updateUser: UserManagementActions.UpdateUserManagementAction) => {
          return this.userManagementService.updateUser(updateUser.payload, updateUser.Url).pipe(
            map(
              (updateUserRes) =>
                new UpdateUserManagementSuccessAction(updateUserRes.data)
            ),
            catchError((error) =>
              observableOf(new UpdateUserManagementFailureAction(error))
            )
          );
        }
      )
    );
  });

  disableUser = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserManagementActions.DisableUserAction>(
        UserManagementActions.UserManagementActionTypes.DISABLE_USER
      ),
      switchMap((disableUser: UserManagementActions.DisableUserAction) => {
        return this.userManagementService
          .enableDisable(disableUser.endUrl, {})
          .pipe(
            map(
              (disableUserRes) => new DisableUserSuccessAction(disableUser.id)
            ),
            catchError((error) =>
              observableOf(new DisableUserFailureAction(error))
            )
          );
      })
    );
  });

  enableUser = createEffect(() => {
    return this.actions$.pipe(
      ofType<UserManagementActions.EnableUserAction>(
        UserManagementActions.UserManagementActionTypes.ENABLE_USER
      ),
      switchMap((enableUser: UserManagementActions.EnableUserAction) => {
        return this.userManagementService
          .enableDisable(enableUser.endUrl, {})
          .pipe(
            map((enableUserRes) => new EnableUserSuccessAction(enableUser.id)),
            catchError((error) =>
              observableOf(new EnableUserFailureAction(error))
            )
          );
      })
    );
  });
}
