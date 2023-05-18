import { Action } from "@ngrx/store";
import { User } from "../../../interfaces/user.interface";

export enum UserManagementActionTypes {
  LOAD_USER_MANAGEMENT_ACTION = "[USERMANAGEMENT] Load User Management Request",
  LOAD_USER_MANAGEMENT_SUCCESS = "[USERMANAGEMENT] Load User Management Success",
  LOAD_USER_MANAGEMENT_FAILURE = "[USERMANAGEMENT] Load User Management Failure",
  SAVE_USER_MANAGEMENT_ACTION = "[USERMANAGEMENT] Save User Management",
  SAVE_USER_MANAGEMENT_SUCCESS = "[USERMANAGEMENT] Save User Management Success",
  AFTER_SAVE_USER_MANAGEMENT_SUCCESS = "[USERMANAGEMENT] After Save User Management Success",
  SAVE_USER_MANAGEMENT_FAILURE = "[USERMANAGEMENT] Save User Management Failure",
  AFTER_SAVE_USER_MANAGEMENT_FAILURE = "[USERMANAGEMENT] After Save User Management Failure",
  UPDATE_USER_MANAGEMENT_ACTION = "[USERMANAGEMENT] Update User Management",
  UPDATE_USER_MANAGEMENT_SUCCESS = "[USERMANAGEMENT] Update User Management Success",
  AFTER_UPDATE_USER_MANAGEMENT_SUCCESS = "[USERMANAGEMENT] After Update User Management Success",
  UPDATE_USER_MANAGEMENT_FAILURE = "[USERMANAGEMENT] Update User Management Failure",
  AFTER_UPDATE_USER_MANAGEMENT_FAILURE = "[USERMANAGEMENT] After Update User Management Failure",
  DISABLE_USER = "[USERMANAGEMENT] Disable User",
  DISABLE_USER_SUCCESS = "[USERMANAGEMENT] Disable User Success",
  DISABLE_USER_FAILURE = "[USERMANAGEMENT] Disable User Failure",
  ENABLE_USER = "[USERMANAGEMENT] Enable User",
  ENABLE_USER_SUCCESS = "[USERMANAGEMENT] Enable User Success",
  ENABLE_USER_FAILURE = "[USERMANAGEMENT] Enable User Failure",
}

export class LoadUserManagementRequestAction implements Action {
  readonly type = UserManagementActionTypes.LOAD_USER_MANAGEMENT_ACTION;
}

export class LoadUserManagementSuccessAction implements Action {
  readonly type = UserManagementActionTypes.LOAD_USER_MANAGEMENT_SUCCESS;
  constructor(public payload: User[]) {}
}

export class LoadUserManagementFailureAction implements Action {
  readonly type = UserManagementActionTypes.LOAD_USER_MANAGEMENT_FAILURE;
  constructor(public payload: string) {}
}

export class SaveUserManagementAction implements Action {
  readonly type = UserManagementActionTypes.SAVE_USER_MANAGEMENT_ACTION;
  constructor(public payload: User, public Url: string) {}
}

export class SaveUserManagementSuccessAction implements Action {
  readonly type = UserManagementActionTypes.SAVE_USER_MANAGEMENT_SUCCESS;
  constructor(public payload: User) {}
}

export class SaveUserManagementFailureAction implements Action {
  readonly type = UserManagementActionTypes.SAVE_USER_MANAGEMENT_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateUserManagementAction implements Action {
  readonly type = UserManagementActionTypes.UPDATE_USER_MANAGEMENT_ACTION;
  constructor(public payload: User,  public Url: string) {}
}

export class UpdateUserManagementSuccessAction implements Action {
  readonly type = UserManagementActionTypes.UPDATE_USER_MANAGEMENT_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserManagementFailureAction implements Action {
  readonly type = UserManagementActionTypes.UPDATE_USER_MANAGEMENT_FAILURE;
  constructor(public payload: any) {}
}

export class DisableUserAction implements Action {
  readonly type = UserManagementActionTypes.DISABLE_USER;
  constructor(public endUrl: string, public id: string) {}
}

export class DisableUserSuccessAction implements Action {
  readonly type = UserManagementActionTypes.DISABLE_USER_SUCCESS;
  constructor(public payload: string) {}
}

export class DisableUserFailureAction implements Action {
  readonly type = UserManagementActionTypes.DISABLE_USER_FAILURE;
  constructor(public payload: string) {}
}

export class EnableUserAction implements Action {
  readonly type = UserManagementActionTypes.ENABLE_USER;
  constructor(public endUrl: string, public id: string) {}
}

export class EnableUserSuccessAction implements Action {
  readonly type = UserManagementActionTypes.ENABLE_USER_SUCCESS;
  constructor(public payload: string) {}
}

export class EnableUserFailureAction implements Action {
  readonly type = UserManagementActionTypes.ENABLE_USER_FAILURE;
  constructor(public payload: string) {}
}

export class AfterSaveUserManagementSuccessAction implements Action {
  readonly type = UserManagementActionTypes.AFTER_SAVE_USER_MANAGEMENT_SUCCESS;
  constructor() {}
}

export class AfterSaveUserManagementFailureAction implements Action {
  readonly type = UserManagementActionTypes.AFTER_SAVE_USER_MANAGEMENT_FAILURE;
  constructor() {}
}

export class AfterUpdateUserManagementSuccessAction implements Action {
  readonly type =
    UserManagementActionTypes.AFTER_UPDATE_USER_MANAGEMENT_SUCCESS;
  constructor() {}
}

export class AfterUpdateUserManagementFailureAction implements Action {
  readonly type =
    UserManagementActionTypes.AFTER_UPDATE_USER_MANAGEMENT_FAILURE;
  constructor() {}
}

export type UserManagementActions =
  | LoadUserManagementRequestAction
  | LoadUserManagementSuccessAction
  | LoadUserManagementFailureAction
  | SaveUserManagementAction
  | SaveUserManagementSuccessAction
  | SaveUserManagementFailureAction
  | UpdateUserManagementAction
  | UpdateUserManagementSuccessAction
  | UpdateUserManagementFailureAction
  | DisableUserAction
  | DisableUserSuccessAction
  | DisableUserFailureAction
  | EnableUserAction
  | EnableUserSuccessAction
  | EnableUserFailureAction
  | AfterSaveUserManagementSuccessAction
  | AfterSaveUserManagementFailureAction
  | AfterUpdateUserManagementSuccessAction
  | AfterUpdateUserManagementFailureAction;
