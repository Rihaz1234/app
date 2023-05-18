import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {  of as observableOf } from "rxjs";
import { catchError, map,  mergeMap } from "rxjs/operators";
import * as featureActions from "./manage-users.actions";
import { ManageUsersService } from "../services/manage-users.service";
import { MatDialogRef } from "@angular/material/dialog";

@Injectable()
export class ManageUsersEffects {
  constructor(
    private manageUsersService: ManageUsersService,
    private actions$: Actions,
   
  ) {}

  @Effect()
  loadAdminUsersRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.LoadAdminUsersRequestAction>(
      featureActions.ActionTypes.LOAD_ADMIN_USERS_REQUEST
    ),
    mergeMap((action) =>
      this.manageUsersService.getAdminUsersList(action.payload.params).pipe(
        map((data) => new featureActions.LoadAdminUsersSuccessAction({ data })),
        catchError((error) =>
          observableOf(
            new featureActions.LoadAdminUsersFailureAction({ error })
          )
        )
      )
    )
  );
  @Effect()
  AddUserRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.AddUserRequestAction>(
      featureActions.ActionTypes.ADD_USER_REQUEST
    ),
    mergeMap((action) =>
      this.manageUsersService.addUser(action.payload.data).pipe(
        map((data) => new featureActions.AddUserSuccessAction({ data })),
        catchError((error) =>
          observableOf(new featureActions.AddUserFailureAction({ error }))
        )
      )
    )
  );

  // @Effect({dispatch: false})
  EditUserRequestEffect$ = this.actions$.pipe(
    ofType<featureActions.EditUserRequestAction>(
      featureActions.ActionTypes.EDIT_USER_REQUEST
    ),
    mergeMap((action) =>
      this.manageUsersService.editUser(action.payload.data).pipe(
        map((data) => new featureActions.EditUserSuccessAction({ data })),
        catchError((error) =>
          observableOf(new featureActions.EditUserFailureAction({ error }))
        )
      )
    )
  );
}
