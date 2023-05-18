import { Action } from "@ngrx/store";
import { TableAPIResponse } from "src/app/models/api.model";
import { ClinicalFacility, ClinicalFacilityResponse } from "../../clinical-facility-management/clinical-facility.interface";

export enum CfActionTypes {
  LOAD_CLINICAL_FACILITY_ACTION = "[CLINICALFACILITY] Load Clinical Facility Request",
  LOAD_CLINICAL_FACILITY_SUCCESS = "[CLINICALFACILITY] Load Clinical Facility Success",
  LOAD_CLINICAL_FACILITY_FAILURE = "[CLINICALFACILITY] Load Clinical Facility Failure",
  SAVE_CLINICAL_FACILITY_ACTION = "[CLINICALFACILITY] Save Clinical Facility",
  SAVE_CLINICAL_FACILITY_SUCCESS = "[CLINICALFACILITY] Save Clinical Facility Success",
  AFTER_SAVE_CLINICAL_FACILITY_SUCCESS = "[CLINICALFACILITY] After Save Clinical Facility Success",
  SAVE_CLINICAL_FACILITY_FAILURE = "[CLINICALFACILITY] Save Clinical Facility Failure",
  AFTER_SAVE_CLINICAL_FACILITY_FAILURE = "[CLINICALFACILITY] After Save Clinical Facility Failure",
  UPDATE_CLINICAL_FACILITY_ACTION = "[CLINICALFACILITY] Update Clinical Facility",
  UPDATE_CLINICAL_FACILITY_SUCCESS = "[CLINICALFACILITY] Update Clinical Facility Success",
  AFTER_UPDATE_CLINICAL_FACILITY_SUCCESS = "[CLINICALFACILITY] After Update Clinical Facility Success",
  UPDATE_CLINICAL_FACILITY_FAILURE = "[CLINICALFACILITY] Update Clinical Facility Failure",
  AFTER_UPDATE_CLINICAL_FACILITY_FAILURE = "[CLINICALFACILITY] After Update Clinical Facility Failure",
  LOAD_CLINICAL_FACILITY_ADMIN_CLONE_ACTION = "[CLINICALFACILITY] Load Clinical Facility Admin Clone Request",
  LOAD_CLINICAL_FACILITY_ADMIN_CLONE_SUCCESS = "[CLINICALFACILITY] Load Clinical Facility Admin Clone Success",
  LOAD_CLINICAL_FACILITY_ADMIN_CLONE_FAILURE = "[CLINICALFACILITY] Load Clinical Facility Admin Clone Failure",
}

export class LoadClinicalFacilityRequestAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_ACTION;
}

export class LoadClinicalFacilitySuccessAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_SUCCESS;
  constructor(public payload: ClinicalFacilityResponse) {}
}

export class LoadClinicalFacilityFailureAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_FAILURE;
  constructor(public payload: string) {}
}

export class SaveClinicalFacilityAction implements Action {
  readonly type = CfActionTypes.SAVE_CLINICAL_FACILITY_ACTION;
  constructor(public payload: ClinicalFacility) {}
}

export class SaveClinicalFacilitySuccessAction implements Action {
  readonly type = CfActionTypes.SAVE_CLINICAL_FACILITY_SUCCESS;
  constructor(public payload: ClinicalFacility) {}
}

export class SaveClinicalFacilityFailureAction implements Action {
  readonly type = CfActionTypes.SAVE_CLINICAL_FACILITY_FAILURE;
  constructor(public payload: string) {}
}

export class UpdateClinicalFacilityAction implements Action {
  readonly type = CfActionTypes.UPDATE_CLINICAL_FACILITY_ACTION;
  constructor(public payload: ClinicalFacility) {}
}

export class UpdateClinicalFacilitySuccessAction implements Action {
  readonly type = CfActionTypes.UPDATE_CLINICAL_FACILITY_SUCCESS;
  constructor(public payload: ClinicalFacility) {}
}

export class UpdateClinicalFacilityFailureAction implements Action {
  readonly type = CfActionTypes.UPDATE_CLINICAL_FACILITY_FAILURE;
  constructor(public payload: string) {}
}

export class AfterSaveClinicalFacilitySuccess implements Action {
  readonly type = CfActionTypes.AFTER_SAVE_CLINICAL_FACILITY_SUCCESS;
  constructor() {}
}

export class AfterSaveClinicalFacilityFailure implements Action {
  readonly type = CfActionTypes.AFTER_SAVE_CLINICAL_FACILITY_FAILURE;
  constructor() {}
}

export class AfterUpdateClinicalFacilitySuccess implements Action {
  readonly type = CfActionTypes.AFTER_UPDATE_CLINICAL_FACILITY_SUCCESS;
  constructor() {}
}

export class AfterUpdateClinicalFacilityFailure implements Action {
  readonly type = CfActionTypes.AFTER_UPDATE_CLINICAL_FACILITY_FAILURE;
  constructor() {}
}
export class LoadFacilityAdminCloneRequestAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_ACTION;
  constructor(public payload: {cfId: string}) {}
}

export class LoadFacilityAdminCloneFailureAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class LoadFacilityAdminCloneSuccessAction implements Action {
  readonly type = CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_SUCCESS;
  constructor(public payload: { data:  any}) {}
}

export type ClinicalFacilityActions =
  | LoadClinicalFacilityRequestAction
  | LoadClinicalFacilitySuccessAction
  | LoadClinicalFacilityFailureAction
  | SaveClinicalFacilityAction
  | SaveClinicalFacilitySuccessAction
  | SaveClinicalFacilityFailureAction
  | UpdateClinicalFacilityAction
  | UpdateClinicalFacilitySuccessAction
  | UpdateClinicalFacilityFailureAction
  | AfterSaveClinicalFacilitySuccess
  | AfterSaveClinicalFacilityFailure
  | AfterUpdateClinicalFacilitySuccess
  | AfterUpdateClinicalFacilityFailure
  | LoadFacilityAdminCloneRequestAction
  | LoadFacilityAdminCloneFailureAction
  | LoadFacilityAdminCloneSuccessAction ;
