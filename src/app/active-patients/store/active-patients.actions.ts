import { Action } from "@ngrx/store";
import {
  ActivePatient,
  AssignGroup,
  DOCTORS,
  NewPatient,
  UnassignedPatient,
} from "../models/active-patients.model";

export enum ActionTypes {
  LOAD_ACTIVE_PATIENTS_REQUEST = "[ACTIVEPATIENTS] Load active patients request",
  LOAD_ACTIVE_PATIENTS_FAILURE = "[ACTIVEPATIENTS] Load active patients Failure",
  LOAD_ACTIVE_PATIENTS_SUCCESS = "[ACTIVEPATIENTS] Load active patients Success",

  LOAD_UNASSIGNED_PATIENTS_REQUEST = "[UNASSIGNEDPATIENTS] Load unassigned patients request",
  LOAD_UNASSIGNED_PATIENTS_FAILURE = "[UNASSIGNEDPATIENTS] Load unassigned patients Failure",
  LOAD_UNASSIGNED_PATIENTS_SUCCESS = "[UNASSIGNEDPATIENTS] Load unassigned patients Success",

  LOAD_DOCTORS_LIST_REQUEST = "[DOCTORS] Load doctors list request",
  LOAD_DOCTORS_LIST_FAILURE = "[DOCTORS] Load doctors list Failure",
  LOAD_DOCTORS_LIST_SUCCESS = "[DOCTORS] Load doctors list Success",

  CREATE_NEW_PATIENT_REQUEST = "[ACTIVEPATIENTS] Create new patient request",
  CREATE_NEW_PATIENT_FAILURE = "[ACTIVEPATIENTS] Create new patient Failure",
  CREATE_NEW_PATIENT_SUCCESS = "[ACTIVEPATIENTS] Create new patient Success",

  UPDATE_PATIENT_REQUEST = "[ACTIVEPATIENTS] Update patient request",
  UPDATE_PATIENT_FAILURE = "[ACTIVEPATIENTS] Update patient Failure",
  UPDATE_PATIENT_SUCCESS = "[ACTIVEPATIENTS] Update patient Success",

  ASSIGN_GROUP_REQUEST = "[ASSIGNGROUP] assign group request",
  ASSIGN_GROUP_FAILURE = "[ASSIGNGROUP] assign group Failure",
  ASSIGN_GROUP_SUCCESS = "[ASSIGNGROUP] assign group Success",

  DISCHARGE_PATIENT_REQUEST = "[ACTIVEPATIENTS] DISCHARGE patient request",
  DISCHARGE_PATIENT_FAILURE = "[ACTIVEPATIENTS] DISCHARGE patient Failure",
  DISCHARGE_PATIENT_SUCCESS = "[ACTIVEPATIENTS] DISCHARGE patient Success",

  STOP_MONITORING_REQUEST = "[ACTIVEPATIENTS] Stop Monitoring patient request",
  STOP_MONITORING_FAILURE = "[ACTIVEPATIENTS] Stop Monitoring patient Failure",
  STOP_MONITORING_SUCCESS = "[ACTIVEPATIENTS] Stop Monitoring patient Success",

  SET_SELECTED_PATIENTS_IDs_REQUEST = "[ACTIVEPATIENTS] Set selected patient ids request",
  SET_SELECTED_PATIENTS_IDs_FAILURE = "[ACTIVEPATIENTS] Set selected patient ids Failure",
  SET_SELECTED_PATIENTS_IDs_SUCCESS = "[ACTIVEPATIENTS] Set selected patient ids Success",

  SET_SELECTED_TAB_REQUEST = "[TableTab] Set selected patient ids request",
  SET_SELECTED_TAB_FAILURE = "[TableTab] Set selected patient ids Failure",
  SET_SELECTED_TAB_SUCCESS = "[TableTab] Set selected patient ids Success",
}

export class LoadActivePatientsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_ACTIVE_PATIENTS_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class LoadActivePatientsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_ACTIVE_PATIENTS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadActivePatientsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ACTIVE_PATIENTS_SUCCESS;
  constructor(
    public payload: { data: { patients: ActivePatient[]; total: number } }
  ) {}
}

export class LoadUnassignedPatientsRequestAction implements Action {
  readonly type = ActionTypes.LOAD_UNASSIGNED_PATIENTS_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class LoadUnassignedPatientsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_UNASSIGNED_PATIENTS_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class LoadUnassignedPatientsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_UNASSIGNED_PATIENTS_SUCCESS;
  constructor(
    public payload: { data:{ items : UnassignedPatient[]; total: number } }
  ) {}
}

export class LoadDoctorsListRequestAction implements Action {
  readonly type = ActionTypes.LOAD_DOCTORS_LIST_REQUEST;
}

export class LoadDoctorsListFailureAction implements Action {
  readonly type = ActionTypes.LOAD_DOCTORS_LIST_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class LoadDoctorsListSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_DOCTORS_LIST_SUCCESS;
  constructor(public payload: { doctors: DOCTORS[] }) {}
}

export class CreateNewPatientRequestAction implements Action {
  readonly type = ActionTypes.CREATE_NEW_PATIENT_REQUEST;
  constructor(public payload: NewPatient) {}
}

export class CreateNewPatientFailureAction implements Action {
  readonly type = ActionTypes.CREATE_NEW_PATIENT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateNewPatientSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_NEW_PATIENT_SUCCESS;
  constructor(public payload: { newPatient: NewPatient }) {}
}

export class UpdatePatientRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_PATIENT_REQUEST;
  constructor(public payload: NewPatient) {}
}

export class UpdatePatientFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_PATIENT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdatePatientSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PATIENT_SUCCESS;
  constructor(public payload: { updatedData: NewPatient }) {}
}

export class AssignGroupRequestAction implements Action {
  readonly type = ActionTypes.ASSIGN_GROUP_REQUEST;
  constructor(public payload: any) {}
}

export class AssignGroupFailureAction implements Action {
  readonly type = ActionTypes.ASSIGN_GROUP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AssignGroupSuccessAction implements Action {
  readonly type = ActionTypes.ASSIGN_GROUP_SUCCESS;
  constructor(public payload: { updatedData: any }) {}
}

export class DischargePatientRequestAction implements Action {
  readonly type = ActionTypes.DISCHARGE_PATIENT_REQUEST;
  constructor(public payload: NewPatient) {}
}

export class DischargePatientFailureAction implements Action {
  readonly type = ActionTypes.DISCHARGE_PATIENT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DischargePatientSuccessAction implements Action {
  readonly type = ActionTypes.DISCHARGE_PATIENT_SUCCESS;
  constructor(public payload: { dischargedPatient: NewPatient }) {}
}

export class StopMonitoringRequestAction implements Action {
  readonly type = ActionTypes.STOP_MONITORING_REQUEST;
  constructor(public payload: NewPatient) {}
}

export class StopMonitoringFailureAction implements Action {
  readonly type = ActionTypes.STOP_MONITORING_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class StopMonitoringSuccessAction implements Action {
  readonly type = ActionTypes.STOP_MONITORING_SUCCESS;
  constructor(public payload: { patient: NewPatient }) {}
}

export class SetSelectedPatientIdsRequestAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_PATIENTS_IDs_REQUEST;
  constructor(public payload: string[]) {}
}

export class SetSelectedPatientIdsFailureAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_PATIENTS_IDs_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SetSelectedPatientIdsSuccessAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_PATIENTS_IDs_SUCCESS;
  constructor(public payload: { patientIds: string[] }) {}
}

export class SetSelectedTabRequestAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_TAB_REQUEST;
  constructor(public payload: string) {}
}

export class SetSelectedTabFailureAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_TAB_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SetSelectedTabSuccessAction implements Action {
  readonly type = ActionTypes.SET_SELECTED_TAB_SUCCESS;
  constructor(public payload: { selectedTab: string }) {}
}

export type ActivePatientsActions =
  | LoadActivePatientsFailureAction
  | LoadActivePatientsRequestAction
  | LoadActivePatientsSuccessAction
  | LoadDoctorsListFailureAction
  | LoadDoctorsListRequestAction
  | LoadDoctorsListSuccessAction
  | CreateNewPatientFailureAction
  | CreateNewPatientRequestAction
  | CreateNewPatientSuccessAction
  | UpdatePatientRequestAction
  | UpdatePatientFailureAction
  | UpdatePatientSuccessAction
  | DischargePatientRequestAction
  | DischargePatientFailureAction
  | DischargePatientSuccessAction
  | StopMonitoringFailureAction
  | StopMonitoringRequestAction
  | StopMonitoringSuccessAction
  | SetSelectedPatientIdsFailureAction
  | SetSelectedPatientIdsRequestAction
  | SetSelectedPatientIdsSuccessAction
  | LoadUnassignedPatientsRequestAction
  | LoadUnassignedPatientsFailureAction
  | LoadUnassignedPatientsSuccessAction
  | SetSelectedTabRequestAction
  | SetSelectedTabFailureAction
  | SetSelectedTabSuccessAction
  | AssignGroupFailureAction
  | AssignGroupRequestAction
  | AssignGroupSuccessAction;
