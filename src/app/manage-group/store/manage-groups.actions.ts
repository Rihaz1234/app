import { Action } from "@ngrx/store";
import { Group, GroupResponse } from "../models/manage-groups.model";

export enum ActionTypes {
  LOAD_GROUPS_REQUEST = "[Group] Load groups request",
  LOAD_GROUPS_FAILURE = "[Group] Load groups Failure",
  LOAD_GROUPS_SUCCESS = "[Group] Load groups Success",

  SAVE_GROUP_REQUEST = "[Group] save group request",
  SAVE_GROUP_FAILURE = "[Group] save group Failure",
  SAVE_GROUP_SUCCESS = "[Group] save group Success",

  UPDATE_GROUP_REQUEST = "[Group] update group request",
  UPDATE_GROUP_FAILURE = "[Group] update group Failure",
  UPDATE_GROUP_SUCCESS = "[Group] update group Success",

  REMOVE_GROUP_REQUEST = "[Group] remove group request",
  REMOVE_GROUP_FAILURE = "[Group] remove group Failure",
  REMOVE_GROUP_SUCCESS = "[Group] remove group Success",
}

export class LoadGroupsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_GROUPS_REQUEST;
  constructor() {}
}

export class LoadGroupsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_GROUPS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadGroupsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_GROUPS_SUCCESS;
  constructor(public payload: { groups: GroupResponse[] }) {}
}

export class SaveGroupRequestAction implements Action {
  readonly type = ActionTypes.SAVE_GROUP_REQUEST;
  constructor(public payload: Group) {}
}

export class SaveGroupFailureAction implements Action {
  readonly type = ActionTypes.SAVE_GROUP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SaveGroupSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_GROUP_SUCCESS;
  constructor(public payload: { group: Group }) {}
}

export class UpdateGroupRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_REQUEST;
  constructor(public payload: Group) {}
}

export class UpdateGroupFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateGroupSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_GROUP_SUCCESS;
  constructor(public payload: { group: Group }) {}
}

export class RemoveGroupRequestAction implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_REQUEST;
  constructor(public payload: string) {}
}

export class RemoveGroupFailureAction implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class RemoveGroupSuccessAction implements Action {
  readonly type = ActionTypes.REMOVE_GROUP_SUCCESS;
  constructor(public payload: { group: any }) {}
}

export type GroupsActions =
  | LoadGroupsFailureAction
  | LoadGroupsRequestAction
  | LoadGroupsSuccessAction
  | SaveGroupFailureAction
  | SaveGroupRequestAction
  | SaveGroupSuccessAction
  | UpdateGroupFailureAction
  | UpdateGroupRequestAction
  | UpdateGroupSuccessAction
  | RemoveGroupFailureAction
  | RemoveGroupRequestAction
  | RemoveGroupSuccessAction;
