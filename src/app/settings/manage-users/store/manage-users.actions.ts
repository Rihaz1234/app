import { Action } from "@ngrx/store";
import {
  AddUser,
  CFUser,
  CFUserList,
  QueryParams,
} from "../../../interfaces/manage-users.interface";

export enum ActionTypes {
  LOAD_ADMIN_USERS_REQUEST = "[MANAGEUSERS] Load Admin Users List Request",
  LOAD_ADMIN_USERS_FAILURE = "[MANAGEUSERS] Load Admin Users List Failure",
  LOAD_ADMIN_USERS_SUCCESS = "[MANAGEUSERS] Load Admin Users List Success",
  ADD_USER_REQUEST = "[MANAGEUSERS] Add User Request",
  ADD_USER_FAILURE = "[MANAGEUSERS] Add User Failure",
  ADD_USER_SUCCESS = "[MANAGEUSERS] Add User Success",
  EDIT_USER_REQUEST = "[MANAGEUSERS] Add User Request",
  EDIT_USER_FAILURE = "[MANAGEUSERS] Add User Failure",
  EDIT_USER_SUCCESS = "[MANAGEUSERS] Add User Success",
}
export class LoadAdminUsersRequestAction implements Action {
  readonly type = ActionTypes.LOAD_ADMIN_USERS_REQUEST;
  constructor(public payload: { params: QueryParams }) {}
}

export class LoadAdminUsersFailureAction implements Action {
  readonly type = ActionTypes.LOAD_ADMIN_USERS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadAdminUsersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ADMIN_USERS_SUCCESS;
  constructor(public payload: { data: CFUserList }) {}
}
export class AddUserRequestAction implements Action {
  readonly type = ActionTypes.ADD_USER_REQUEST;
  constructor(public payload: { data: CFUser }) {}
}
export class AddUserFailureAction implements Action {
  readonly type = ActionTypes.ADD_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class AddUserSuccessAction implements Action {
  readonly type = ActionTypes.ADD_USER_SUCCESS;
  constructor(public payload: { data: AddUser }) {}
}
export class EditUserRequestAction implements Action {
  readonly type = ActionTypes.EDIT_USER_REQUEST;
  constructor(public payload: { data: CFUser }) {}
}
export class EditUserFailureAction implements Action {
  readonly type = ActionTypes.EDIT_USER_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class EditUserSuccessAction implements Action {
  readonly type = ActionTypes.EDIT_USER_SUCCESS;
  constructor(public payload: { data: AddUser }) {}
}
export type ManageUsersActions =
  | LoadAdminUsersRequestAction
  | LoadAdminUsersFailureAction
  | LoadAdminUsersSuccessAction
  | AddUserFailureAction
  | AddUserSuccessAction
  | AddUserRequestAction
  | EditUserRequestAction
  | EditUserFailureAction
  | EditUserSuccessAction;
