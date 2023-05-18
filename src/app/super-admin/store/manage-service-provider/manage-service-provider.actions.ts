import { Action } from "@ngrx/store";
import { ServiceProvider } from "../../manage-service-provider/service-provider.interface";

export enum ManageSpActionTypes {
  LOAD_SERVICE_PROVIDER_ACTION = "[SERVICEPROVIDER] Load Service Provider Request",
  LOAD_SERVICE_PROVIDER_SUCCESS = "[SERVICEPROVIDER] Load Service Provider Success",
  LOAD_SERVICE_PROVIDER_FAILURE = "[SERVICEPROVIDER] Load Service Provider Failure",
  SAVE_SERVICE_PROVIDER_ACTION = "[SERVICEPROVIDER] Save Service Provider",
  SAVE_SERVICE_PROVIDER_SUCCESS = "[SERVICEPROVIDER] Save Service Provider Success",
  AFTER_SAVE_SERVICE_PROVIDER_SUCCESS = "[SERVICEPROVIDER] After Save Service Provider Success",
  SAVE_SERVICE_PROVIDER_FAILURE = "[SERVICEPROVIDER] Save Service Provider Failure",
  AFTER_SAVE_SERVICE_PROVIDER_FAILURE = "[SERVICEPROVIDER] After Save Service Provider Failure",
  UPDATE_SERVICE_PROVIDER_ACTION = "[SERVICEPROVIDER] Update Service Provider",
  UPDATE_SERVICE_PROVIDER_SUCCESS = "[SERVICEPROVIDER] Update Service Provider Success",
  AFTER_UPDATE_SERVICE_PROVIDER_SUCCESS = "[SERVICEPROVIDER] After Update Service Provider Success",
  UPDATE_SERVICE_PROVIDER_FAILURE = "[SERVICEPROVIDER] Update Service Provider Failure",
  AFTER_UPDATE_SERVICE_PROVIDER_FAILURE = "[SERVICEPROVIDER] After Update Service Provider Failure",
}

export class LoadServiceProviderRequestAction implements Action {
  readonly type = ManageSpActionTypes.LOAD_SERVICE_PROVIDER_ACTION;
}

export class LoadServiceProviderSuccessAction implements Action {
  readonly type = ManageSpActionTypes.LOAD_SERVICE_PROVIDER_SUCCESS;
  constructor(public payload: ServiceProvider[]) {}
}

export class LoadServiceProviderFailureAction implements Action {
  readonly type = ManageSpActionTypes.LOAD_SERVICE_PROVIDER_FAILURE;
  constructor(public payload: string) {}
}

export class SaveServiceProviderAction implements Action {
  readonly type = ManageSpActionTypes.SAVE_SERVICE_PROVIDER_ACTION;
  constructor(public payload: ServiceProvider) {}
}

export class SaveServiceProviderSuccessAction implements Action {
  readonly type = ManageSpActionTypes.SAVE_SERVICE_PROVIDER_SUCCESS;
  constructor(public payload: ServiceProvider) {}
}

export class SaveServiceProviderFailureAction implements Action {
  readonly type = ManageSpActionTypes.SAVE_SERVICE_PROVIDER_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateServiceProviderAction implements Action {
  readonly type = ManageSpActionTypes.UPDATE_SERVICE_PROVIDER_ACTION;
  constructor(public payload: ServiceProvider) {}
}

export class UpdateServiceProviderSuccessAction implements Action {
  readonly type = ManageSpActionTypes.UPDATE_SERVICE_PROVIDER_SUCCESS;
  constructor(public payload: ServiceProvider) {}
}

export class UpdateServiceProviderFailureAction implements Action {
  readonly type = ManageSpActionTypes.UPDATE_SERVICE_PROVIDER_FAILURE;
  constructor(public payload: any) {}
}

export class AfterSaveServiceProviderSuccess implements Action {
  readonly type = ManageSpActionTypes.AFTER_SAVE_SERVICE_PROVIDER_SUCCESS;
  constructor() {}
}

export class AfterSaveServiceProviderFailure implements Action {
  readonly type = ManageSpActionTypes.AFTER_SAVE_SERVICE_PROVIDER_FAILURE;
  constructor() {}
}

export class AfterUpdateServiceProviderSuccess implements Action {
  readonly type = ManageSpActionTypes.AFTER_UPDATE_SERVICE_PROVIDER_SUCCESS;
  constructor() {}
}

export class AfterUpdateServiceProviderFailure implements Action {
  readonly type = ManageSpActionTypes.AFTER_UPDATE_SERVICE_PROVIDER_FAILURE;
  constructor() {}
}

export type ServiceProviderActions =
  | LoadServiceProviderRequestAction
  | LoadServiceProviderSuccessAction
  | LoadServiceProviderFailureAction
  | SaveServiceProviderAction
  | SaveServiceProviderSuccessAction
  | SaveServiceProviderFailureAction
  | UpdateServiceProviderAction
  | UpdateServiceProviderSuccessAction
  | UpdateServiceProviderFailureAction
  | AfterSaveServiceProviderSuccess
  | AfterSaveServiceProviderFailure
  | AfterUpdateServiceProviderSuccess
  | AfterUpdateServiceProviderFailure;
