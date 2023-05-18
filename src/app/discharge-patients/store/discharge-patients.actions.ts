import { Action } from "@ngrx/store";
import { DischargePatient } from "../models/discharge-patient.model";

export enum ActionTypes {
  LOAD_DISCHARGE_PATIENTS_REQUEST = "[DISCHARGEPATIENTS] Load discharge patients request",
  LOAD_DISCHARGE_PATIENTS_FAILURE = "[DISCHARGEPATIENTS] Load discharge patients Failure",
  LOAD_DISCHARGE_PATIENTS_SUCCESS = "[DISCHARGEPATIENTS] Load discharge patients Success",
}

export class LoadDischargePatientsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_DISCHARGE_PATIENTS_REQUEST;
  constructor(public payload: {url :string}) {}
}

export class LoadDischargePatientsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_DISCHARGE_PATIENTS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadDischargePatientsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_DISCHARGE_PATIENTS_SUCCESS;
  constructor(public payload: { items: DischargePatient[]; total: number }) {}
}

export type DischargePatientsActions =
  | LoadDischargePatientsFailureAction
  | LoadDischargePatientsRequestAction
  | LoadDischargePatientsSuccessAction;
