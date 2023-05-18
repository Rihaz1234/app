import { Action } from "@ngrx/store";
import {
  MPRelayList,
  RelayConfigurationResponse,
  SinglePatientRelay,
  SPRelayList,
} from "../../../interfaces/manage-relays.interface";
import { QueryParams } from "../../../interfaces/manage-users.interface";

export enum ActionTypes {
  LOAD_SINGLE_PATIENT_RELAYS_REQUEST = "[MANAGERELAYS] Load SP Relay List Request",
  LOAD_SINGLE_PATIENT_RELAYS_FAILURE = "[MANAGERELAYS] Load SP Relay List Failure",
  LOAD_SINGLE_PATIENT_RELAYS_SUCCESS = "[MANAGERELAYS] Load SP Relay List Success",
  LOAD_MULTI_PATIENT_RELAYS_REQUEST = "[MANAGERELAYS] Load MP Relay List Request",
  LOAD_MULTI_PATIENT_RELAYS_FAILURE = "[MANAGERELAYS] Load MP Relay List Failure",
  LOAD_MULTI_PATIENT_RELAYS_SUCCESS = "[MANAGERELAYS] Load MP Relay List Success",
  LOAD_RELAY_CONFIGURATION_REQUEST = "[MANAGERELAYS] Load Relay Configuration Request",
  LOAD_RELAY_CONFIGURATION_FAILURE = "[MANAGERELAYS] Load Relay Configuration Failure",
  LOAD_RELAY_CONFIGURATION_SUCCESS = "[MANAGERELAYS] Load Relay Configuration Success",
  LOAD_CARE_GIVER_RELAYS_REQUEST = "[MANAGERELAYS] Load CG Relay List Request",
  LOAD_CARE_GIVER_RELAYS_FAILURE = "[MANAGERELAYS] Load CG Relay List Failure",
  LOAD_CARE_GIVER_RELAYS_SUCCESS = "[MANAGERELAYS] Load CG Relay List Success",
}
export class LoadSPRelaysRequestAction implements Action {
  readonly type = ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_REQUEST;
  constructor(public payload: { params: QueryParams }) {}
}

export class LoadSPRelaysFailureAction implements Action {
  readonly type = ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadSPRelaysSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_SUCCESS;
  constructor(public payload: { data: SPRelayList }) {}
}
export class LoadMPRelaysRequestAction implements Action {
  readonly type = ActionTypes.LOAD_MULTI_PATIENT_RELAYS_REQUEST;
  constructor(public payload: { params: QueryParams }) {}
}

export class LoadMPRelaysFailureAction implements Action {
  readonly type = ActionTypes.LOAD_MULTI_PATIENT_RELAYS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadMPRelaysSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MULTI_PATIENT_RELAYS_SUCCESS;
  constructor(public payload: { data: MPRelayList }) {}
}
export class LoadRelayConfigurationRequestAction implements Action {
  readonly type = ActionTypes.LOAD_RELAY_CONFIGURATION_REQUEST;
  constructor(public payload: {}) {}
}

export class LoadRelayConfigurationFailureAction implements Action {
  readonly type = ActionTypes.LOAD_RELAY_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadRelayConfigurationSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_RELAY_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: RelayConfigurationResponse }) {}
}
export class LoadCGRelaysRequestAction implements Action {
  readonly type = ActionTypes.LOAD_CARE_GIVER_RELAYS_REQUEST;
  constructor(public payload: { params: QueryParams }) {}
}

export class LoadCGRelaysFailureAction implements Action {
  readonly type = ActionTypes.LOAD_CARE_GIVER_RELAYS_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadCGRelaysSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_CARE_GIVER_RELAYS_SUCCESS;
  constructor(public payload: { data: SPRelayList }) {}
}
export type ManageRelaysActions =
  | LoadSPRelaysRequestAction
  | LoadSPRelaysFailureAction
  | LoadSPRelaysSuccessAction
  | LoadMPRelaysRequestAction
  | LoadMPRelaysFailureAction
  | LoadMPRelaysSuccessAction
  | LoadRelayConfigurationRequestAction
  | LoadRelayConfigurationFailureAction
  | LoadRelayConfigurationSuccessAction
  | LoadCGRelaysRequestAction
  | LoadCGRelaysFailureAction
  | LoadCGRelaysSuccessAction;
