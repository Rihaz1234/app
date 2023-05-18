import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { ManageGroupsService } from "../services/manage-groups.service";
import * as featureActions from "./manage-groups.actions";

@Injectable()
export class ManageGroupsEffects {
  constructor(
    private manageGroupService: ManageGroupsService,
    private actions$: Actions
  ) { }

  loadGroups$: Observable<Action> = createEffect(() => {
    console.log("calling");
    return this.actions$.pipe(
      ofType<featureActions.LoadGroupsRequestAction>(
        featureActions.ActionTypes.LOAD_GROUPS_REQUEST
      ),
      exhaustMap(() => {
        return this.manageGroupService.fetch().pipe(
          map(
            (groups) => new featureActions.LoadGroupsSuccessAction({ groups: groups.data })
          ),
          catchError((error) =>
            of(new featureActions.LoadGroupsFailureAction(error))
          )
        );
      })
    );
  });

  saveGroup$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<featureActions.SaveGroupRequestAction>(
        featureActions.ActionTypes.SAVE_GROUP_REQUEST
      ),
      exhaustMap((data) => {
        return this.manageGroupService.save(data.payload).pipe(
          map((group) => {
            return new featureActions.SaveGroupSuccessAction({ group })
          }),
          catchError((error) =>
            of(new featureActions.SaveGroupFailureAction(error))
          )
        );
      })
    );
  });

  updateGroup$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<featureActions.UpdateGroupRequestAction>(
        featureActions.ActionTypes.UPDATE_GROUP_REQUEST
      ),
      exhaustMap((data) => {
        return this.manageGroupService.update(data.payload).pipe(
          map((group) => {
            return new featureActions.UpdateGroupSuccessAction({ group })
          }),
          catchError((error) =>
            of(new featureActions.UpdateGroupFailureAction(error))
          )
        );
      })
    );
  });

  removeGroup$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<featureActions.RemoveGroupRequestAction>(
        featureActions.ActionTypes.REMOVE_GROUP_REQUEST
      ),
      exhaustMap((data) => {
        return this.manageGroupService.remove(data.payload).pipe(
          map((group) => {
            return new featureActions.RemoveGroupSuccessAction({ group })
          }),
          catchError((error) =>
            of(new featureActions.RemoveGroupFailureAction(error))
          )
        );
      })
    );
  });
}
