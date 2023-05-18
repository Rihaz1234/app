import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import {
  catchError,
  map,
  mergeMap,
  startWith,
  switchMap,
} from "rxjs/operators";
import { SuperAdminService } from "../../service/super-admin.service";
import * as ManageServiceProviderActions from "./manage-service-provider.actions";
import { of as observableOf } from "rxjs";
import {
  SaveServiceProviderFailureAction,
  SaveServiceProviderSuccessAction,
  LoadServiceProviderFailureAction,
  LoadServiceProviderSuccessAction,
  UpdateServiceProviderFailureAction,
  UpdateServiceProviderSuccessAction,
} from "./manage-service-provider.actions";

@Injectable()
export class ManageServiceProviderEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private superAdminService: SuperAdminService
  ) {}

  loadServiceProvider = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageServiceProviderActions.LoadServiceProviderRequestAction>(
        ManageServiceProviderActions.ManageSpActionTypes
          .LOAD_SERVICE_PROVIDER_ACTION
      ),
      startWith(
        new ManageServiceProviderActions.LoadServiceProviderRequestAction()
      ),
      mergeMap((action) =>
        this.superAdminService.getAllServiceProvider().pipe(
          map(
            (serviceProviderRes) =>
              new LoadServiceProviderSuccessAction(serviceProviderRes.data)
          ),
          catchError((error) =>
            observableOf(new LoadServiceProviderFailureAction(error))
          )
        )
      )
    );
  });

  saveServiceProvider = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageServiceProviderActions.SaveServiceProviderAction>(
        ManageServiceProviderActions.ManageSpActionTypes
          .SAVE_SERVICE_PROVIDER_ACTION
      ),
      switchMap(
        (
          addServiceProvider: ManageServiceProviderActions.SaveServiceProviderAction
        ) => {
          return this.superAdminService
            .addServiceProvider(addServiceProvider.payload)
            .pipe(
              map(
                (addServiceProviderRes) =>
                  new SaveServiceProviderSuccessAction(
                    addServiceProviderRes.data
                  )
              ),
              catchError((error) =>
                observableOf(new SaveServiceProviderFailureAction(error))
              )
            );
        }
      )
    );
  });

  updateServiceProvider = createEffect(() => {
    return this.actions$.pipe(
      ofType<ManageServiceProviderActions.UpdateServiceProviderAction>(
        ManageServiceProviderActions.ManageSpActionTypes
          .UPDATE_SERVICE_PROVIDER_ACTION
      ),
      switchMap(
        (
          updateServiceProvider: ManageServiceProviderActions.UpdateServiceProviderAction
        ) => {
          return this.superAdminService
            .updateServiceProvider(updateServiceProvider.payload)
            .pipe(
              map(
                (updateServiceProviderRes) =>
                  new UpdateServiceProviderSuccessAction(
                    updateServiceProviderRes.data
                  )
              ),
              catchError((error) =>
                observableOf(new UpdateServiceProviderFailureAction(error))
              )
            );
        }
      )
    );
  });
}
