import { Action } from "@ngrx/store";
import {
  MiscellaneousData,
  MiscSettings,
  spo2ConfigData,
} from "../../../interfaces/misc-settings.interface";

export enum ActionTypes {
  LOAD_MISCELLANEOUS_SETTINGS_REQUEST = "[MISCELLANEOUSSETTINGS] Load miscellaneous settings request",
  LOAD_MISCELLANEOUS_SETTINGS_FAILURE = "[MISCELLANEOUSSETTINGS] Load miscellaneous settings Failure",
  LOAD_MISCELLANEOUS_SETTINGS_SUCCESS = "[MISCELLANEOUSSETTINGS] Load miscellaneous settings Success",

  UPDATE_MISCELLANEOUS_SETTINGS_REQUEST = "[MISCELLANEOUSSETTINGS] Update miscellaneous settings request",
  UPDATE_MISCELLANEOUS_SETTINGS_FAILURE = "[MISCELLANEOUSSETTINGS] Update miscellaneous settings Failure",
  UPDATE_MISCELLANEOUS_SETTINGS_SUCCESS = "[MISCELLANEOUSSETTINGS] Update miscellaneous settings Success",

  RESET_MISCELLANEOUS_SETTINGS_REQUEST = "[MISCELLANEOUSSETTINGS] Reset miscellaneous settings request",
  RESET_MISCELLANEOUS_SETTINGS_FAILURE = "[MISCELLANEOUSSETTINGS] Reset miscellaneous settings Failure",
  RESET_MISCELLANEOUS_SETTINGS_SUCCESS = "[MISCELLANEOUSSETTINGS] Reset miscellaneous settings Success",

  LOAD_SPO2_SETTINGS_REQUEST = "[SPO2ETTINGS] Load Spo2 settings request",
  LOAD_SPO2_SETTINGS_FAILURE = "[SPO2ETTINGS] Load Spo2 settings Failure",
  LOAD_SPO2_SETTINGS_SUCCESS = "[SPO2ETTINGS] Load Spo2 settings Success",

  UPDATE_SPO2_SETTINGS_REQUEST = "[SPO2ETTINGS] Update Spo2 settings request",
  UPDATE_SPO2_SETTINGS_FAILURE = "[SPO2ETTINGS] Update Spo2 settings Failure",
  UPDATE_SPO2_SETTINGS_SUCCESS = "[SPO2ETTINGS] Update Spo2 settings Success",

}


export class loadSpo2SettingsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_SPO2_SETTINGS_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadSpo2SettingsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_SPO2_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadSpo2SettingsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SPO2_SETTINGS_SUCCESS;
  constructor(public payload: { data: spo2ConfigData }) {}
}

export class updateSpo2SettingsRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_SPO2_SETTINGS_REQUEST;
  constructor(public payload: { data: spo2ConfigData ,url: string}) {}
}

export class updateSpo2SettingsFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_SPO2_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class updateSpo2SettingsSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SPO2_SETTINGS_SUCCESS;
  constructor(public payload: { data: spo2ConfigData }) {}
}


export class loadMiscellaneousSettingsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadMiscellaneousSettingsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadMiscellaneousSettingsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_SUCCESS;
  constructor(public payload: { data: MiscSettings }) {}
}

export class updateMiscellaneousSettingsRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_REQUEST;
  constructor(public payload: { data: MiscellaneousData }) {}
}

export class updateMiscellaneousSettingsFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class updateMiscellaneousSettingsSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_SUCCESS;
  constructor(public payload: { data: MiscSettings }) {}
}

export class resetMiscellaneousSettingsRequestAction implements Action {
  readonly type = ActionTypes.RESET_MISCELLANEOUS_SETTINGS_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class resetMiscellaneousSettingsFailureAction implements Action {
  readonly type = ActionTypes.RESET_MISCELLANEOUS_SETTINGS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class resetMiscellaneousSettingsSuccessAction implements Action {
  readonly type = ActionTypes.RESET_MISCELLANEOUS_SETTINGS_SUCCESS;
  constructor(public payload: { data: MiscSettings }) {}
}

export type MiscellaneousSettingsActions =
  | loadMiscellaneousSettingsFailureAction
  | loadMiscellaneousSettingsSuccessAction
  | loadMiscellaneousSettingsRequestAction
  | updateMiscellaneousSettingsFailureAction
  | updateMiscellaneousSettingsSuccessAction
  | updateMiscellaneousSettingsRequestAction
  | resetMiscellaneousSettingsFailureAction
  | resetMiscellaneousSettingsSuccessAction
  | resetMiscellaneousSettingsRequestAction
  | loadSpo2SettingsFailureAction
  | loadSpo2SettingsSuccessAction
  | loadSpo2SettingsRequestAction
  | updateSpo2SettingsFailureAction
  | updateSpo2SettingsSuccessAction
  | updateSpo2SettingsRequestAction;
