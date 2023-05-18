import {
  CfActionTypes,
  ClinicalFacilityActions,
} from "./clinical-facility-management.actions";
import { ClinicalFacility } from "../../clinical-facility-management/clinical-facility.interface";
import { TableState } from "src/app/life-signals/_models/ls-column.model";

export interface ClinicalFacilityState {
  CLINICAL_FACILITY_DATA: ClinicalFacility[];
  error: string;
  save_cf_success: ClinicalFacility;
  save_cf_error: string;
  total: number;
  tableState: string;
  CLINICAL_FACILITY_ADMIN_CLONE: any[]
}

const initialState: ClinicalFacilityState = {
  CLINICAL_FACILITY_DATA: [],
  error: "",
  save_cf_success: null,
  save_cf_error: "",
  total: 0,
  tableState: TableState.DEFAULT,
  CLINICAL_FACILITY_ADMIN_CLONE: []
};

export const clinicalFacilityFeatureKey = "clinicalfacility";

export function clinicalFacilityReducer(
  state: ClinicalFacilityState = initialState,
  action: ClinicalFacilityActions
) {
  switch (action.type) {
    case CfActionTypes.LOAD_CLINICAL_FACILITY_ACTION:
      return {
        ...state,
        CLINICAL_FACILITY_DATA: [],
        tableState: TableState.LOADING
      };

    case CfActionTypes.LOAD_CLINICAL_FACILITY_SUCCESS:
      return {
        ...state,
        CLINICAL_FACILITY_DATA: action.payload.data,
        total: action.payload.data.length,
        tableState: TableState.SUCCESS
      };

    case CfActionTypes.LOAD_CLINICAL_FACILITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        CLINICAL_FACILITY_DATA: [],
        tableState: TableState.FAILURE,
        total: 0
      };

    case CfActionTypes.SAVE_CLINICAL_FACILITY_SUCCESS:
      return {
        ...state,
        save_cf_success: action.payload,
        save_cf_error: "",
        CLINICAL_FACILITY_DATA: [
          ...state?.CLINICAL_FACILITY_DATA,
          action.payload,
        ],
      };

    case CfActionTypes.AFTER_SAVE_CLINICAL_FACILITY_SUCCESS:
      return {
        ...state,
        save_cf_success: null,
        save_cf_error: "",
      };

    case CfActionTypes.SAVE_CLINICAL_FACILITY_FAILURE:
      return {
        ...state,
        save_cf_error: action.payload,
      };

    case CfActionTypes.AFTER_SAVE_CLINICAL_FACILITY_FAILURE:
      return {
        ...state,
        save_cf_error: "",
        save_cf_success: null,
      };

    case CfActionTypes.UPDATE_CLINICAL_FACILITY_SUCCESS:
      const updatedCfData = state?.CLINICAL_FACILITY_DATA.map((cfData) => {
        return cfData.id === action.payload.id ? action.payload : cfData;
      });

      return {
        ...state,
        save_cf_error: "",
        error: "",
        save_cf_success: action.payload,
        CLINICAL_FACILITY_DATA: updatedCfData,
      };

    case CfActionTypes.AFTER_UPDATE_CLINICAL_FACILITY_SUCCESS:
      return {
        ...state,
        save_cf_success: null,
        save_cf_error: "",
      };

    case CfActionTypes.UPDATE_CLINICAL_FACILITY_FAILURE:
      return {
        ...state,
        save_cf_error: action.payload,
      };

    case CfActionTypes.AFTER_UPDATE_CLINICAL_FACILITY_FAILURE:
      return {
        ...state,
        save_cf_error: "",
        save_cf_success: null,
      };
    case CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_ACTION:
      return {
        ...state,
        CLINICAL_FACILITY_ADMIN_CLONE: [],
      };

    case CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_SUCCESS:
      return {
        ...state,
        CLINICAL_FACILITY_ADMIN_CLONE: action.payload.data.data,
      };

    case CfActionTypes.LOAD_CLINICAL_FACILITY_ADMIN_CLONE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
