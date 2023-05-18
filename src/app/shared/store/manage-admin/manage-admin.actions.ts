import { Action } from "@ngrx/store";
import { User } from "../../../interfaces/user.interface";

export enum ManageAdminActionTypes {
  LOAD_MANAGE_ADMIN_ACTION = "[MANAGEADMIN] Load Manage Admin Request",
  LOAD_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] Load Manage Admin Success",
  LOAD_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] Load Manage Admin Failure",
  SAVE_MANAGE_ADMIN_ACTION = "[MANAGEADMIN] Save Manage Admin",
  SAVE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] Save Manage Admin Success",
  AFTER_SAVE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] After Save Manage Admin Success",
  SAVE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] Save Manage Admin Failure",
  AFTER_SAVE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] After Save Manage Admin Failure",
  UPDATE_MANAGE_ADMIN_ACTION = "[MANAGEADMIN] Update Manage Admin",
  UPDATE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] Update Manage Admin Success",
  AFTER_UPDATE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] After Update Manage Admin Success",
  UPDATE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] Update Manage Admin Failure",
  AFTER_UPDATE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] After Update Manage Admin Failure",
  INACTIVE_MANAGE_ADMIN = "[MANAGEADMIN] Inactive Manage Admin",
  INACTIVE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] Inactive Manage Admin Success",
  INACTIVE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] Inactive Manage Admin Failure",
  ACTIVE_MANAGE_ADMIN = "[MANAGEADMIN] Active Manage Admin",
  ACTIVE_MANAGE_ADMIN_SUCCESS = "[MANAGEADMIN] Active Manage Admin Success",
  ACTIVE_MANAGE_ADMIN_FAILURE = "[MANAGEADMIN] Active Manage Admin Failure",
}

export class LoadManageAdminRequestAction implements Action {
  readonly type = ManageAdminActionTypes.LOAD_MANAGE_ADMIN_ACTION;
  constructor(public payload: string) {}
}

export class LoadManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.LOAD_MANAGE_ADMIN_SUCCESS;
  constructor(public payload: User[]) {}
}

export class LoadManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.LOAD_MANAGE_ADMIN_FAILURE;
  constructor(public payload: string) {}
}

export class SaveManageAdminAction implements Action {
  readonly type = ManageAdminActionTypes.SAVE_MANAGE_ADMIN_ACTION;
  constructor(public payload: User, public endUrl: string) {}
}

export class SaveManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.SAVE_MANAGE_ADMIN_SUCCESS;
  constructor(public payload: User) {}
}

export class SaveManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.SAVE_MANAGE_ADMIN_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateManageAdminAction implements Action {
  readonly type = ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_ACTION;
  constructor(public payload: User, public endUrl: string) {}
}

export class UpdateManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_FAILURE;
  constructor(public payload: any) {}
}

export class InactiveManageAdminAction implements Action {
  readonly type = ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN;
  constructor(public endUrl: string, public id: string) {}
}

export class InactiveManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN_SUCCESS;
  constructor(public payload: string) {}
}

export class InactiveManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN_FAILURE;
  constructor(public payload: string) {}
}

export class ActiveManageAdminAction implements Action {
  readonly type = ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN;
  constructor(public endUrl: string, public id: string) {}
}

export class ActiveManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN_SUCCESS;
  constructor(public payload: string) {}
}

export class ActiveManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN_FAILURE;
  constructor(public payload: string) {}
}

export class AfterSaveManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.AFTER_SAVE_MANAGE_ADMIN_SUCCESS;
  constructor() {}
}

export class AfterSaveManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.AFTER_SAVE_MANAGE_ADMIN_FAILURE;
  constructor() {}
}

export class AfterUpdateManageAdminSuccessAction implements Action {
  readonly type = ManageAdminActionTypes.AFTER_UPDATE_MANAGE_ADMIN_SUCCESS;
  constructor() {}
}

export class AfterUpdateManageAdminFailureAction implements Action {
  readonly type = ManageAdminActionTypes.AFTER_UPDATE_MANAGE_ADMIN_FAILURE;
  constructor() {}
}

export type ManageAdminActions =
  | LoadManageAdminRequestAction
  | LoadManageAdminSuccessAction
  | LoadManageAdminFailureAction
  | SaveManageAdminAction
  | SaveManageAdminSuccessAction
  | SaveManageAdminFailureAction
  | UpdateManageAdminAction
  | UpdateManageAdminSuccessAction
  | UpdateManageAdminFailureAction
  | InactiveManageAdminAction
  | InactiveManageAdminSuccessAction
  | InactiveManageAdminFailureAction
  | ActiveManageAdminAction
  | ActiveManageAdminSuccessAction
  | ActiveManageAdminFailureAction
  | AfterSaveManageAdminSuccessAction
  | AfterSaveManageAdminFailureAction
  | AfterUpdateManageAdminSuccessAction
  | AfterUpdateManageAdminFailureAction;
