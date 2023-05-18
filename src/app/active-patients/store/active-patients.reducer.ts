import { TableState } from "src/app/life-signals/_models/ls-column.model";
import {
  ActivePatient,
  NewPatient,
  DOCTORS,
  UnassignedPatient,
  ActivePatientsTabs,
} from "../models/active-patients.model";
import { ActivePatientsActions, ActionTypes } from "./active-patients.actions";

export interface State {
  ACTIVE_PATIENTS_DATA?: ActivePatient[];
  UNASSIGNED_PATIENTS_DATA?: UnassignedPatient[];
  PATIENT?: NewPatient;
  DOCTORS?: DOCTORS[];
  error?: any;
  PATIENT_IDS?: string[];
  SELECTED_TAB?: string;
  tableState?: string;
  addEditState?: string;
  total?: number;
  unassignedPatients_total ?: number;
}

const initialActivePatientState: State = {
  ACTIVE_PATIENTS_DATA: [],
  UNASSIGNED_PATIENTS_DATA: [],
  PATIENT: null,
  DOCTORS: [],
  error: "",
  PATIENT_IDS: null,
  SELECTED_TAB: ActivePatientsTabs.ACTIVE_PATIENT,
  tableState: TableState.DEFAULT,
  addEditState: TableState.DEFAULT,
  total: 0,
  unassignedPatients_total:0
};

export const patientsFeatureKey = "patient";

export function ActivePatientsReducer(
  state: State = initialActivePatientState,
  action: ActivePatientsActions
) {
  switch (action.type) {
    case ActionTypes.LOAD_ACTIVE_PATIENTS_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.LOAD_ACTIVE_PATIENTS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        //ACTIVE_PATIENTS_DATA: [],
        tableState: TableState.FAILURE,
        total: 0
      };
    }

    case ActionTypes.LOAD_ACTIVE_PATIENTS_SUCCESS: {
      return {
        ...state,
        error: null,
        ACTIVE_PATIENTS_DATA: action.payload["data"].patients,
        tableState: TableState.SUCCESS,
        total: action.payload["data"].total
      };
    }

    case ActionTypes.LOAD_UNASSIGNED_PATIENTS_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING
      };
    }

    case ActionTypes.LOAD_UNASSIGNED_PATIENTS_FAILURE: {
      return {
        ...state,
        tableState: TableState.FAILURE,
        UNASSIGNED_PATIENTS_DATA: [],
        error: action.payload.error,
        unassignedPatients_total: 0
      };
    }

    case ActionTypes.LOAD_UNASSIGNED_PATIENTS_SUCCESS: {
      return {
        ...state,
        UNASSIGNED_PATIENTS_DATA: action.payload["data"].items,
        tableState: TableState.SUCCESS,
        unassignedPatients_total: action.payload["data"].total,
        error: null
      };
    }

    case ActionTypes.LOAD_DOCTORS_LIST_REQUEST: {
      return {
        ...state,
        error: null,
        //tableState: TableState.LOADING,
        DOCTORS: []
      };
    }

    case ActionTypes.LOAD_DOCTORS_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.LOAD_DOCTORS_LIST_SUCCESS: {
      return {
        ...state,
        DOCTORS: action.payload["doctors"]["data"],
      };
    }

    case ActionTypes.CREATE_NEW_PATIENT_REQUEST: {
      return {
        ...state,
        PATIENT : null,
        error: null,
        addEditState: TableState.DEFAULT,
      };
    }

    case ActionTypes.CREATE_NEW_PATIENT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        addEditState: TableState.FAILURE,
      };
    }

    case ActionTypes.CREATE_NEW_PATIENT_SUCCESS: {
      return {
      ...state,
      PATIENT: action.payload["newPatient"]["data"],
      ACTIVE_PATIENTS_DATA: [
          ...state.ACTIVE_PATIENTS_DATA,
          action.payload["newPatient"]["data"]
        ],
        total: state?.total + 1,
        addEditState: TableState.SUCCESS,
      };
    }

    case ActionTypes.UPDATE_PATIENT_REQUEST: {
      return {
        ...state,
        error: null,
        addEditState: TableState.LOADING,
      };
    }

    case ActionTypes.UPDATE_PATIENT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        addEditState: TableState.FAILURE,
      };
    }

    case ActionTypes.UPDATE_PATIENT_SUCCESS: {
      let resp: ActivePatient[] = [];
      if (state.SELECTED_TAB === ActivePatientsTabs.ASSIGN_PATIENT && action.payload["updatedData"]["data"]) {
        resp = state.ACTIVE_PATIENTS_DATA;
      } else if (state.SELECTED_TAB === ActivePatientsTabs.ACTIVE_PATIENT) {
        resp = state.ACTIVE_PATIENTS_DATA?.map((x) => {
          if (x?.patientId === ((action.payload["updatedData"]["data"] !== undefined) ? action.payload["updatedData"]["data"]["patientId"] : action.payload["updatedData"]["patientId"])) {
            x = (action.payload["updatedData"]["data"] !== undefined) ? action.payload["updatedData"]["data"] : action.payload["updatedData"];
            return x;
          } else {
            return x;
          }
        })
      }
      return {
        ...state,
        error: null,
        addEditState: TableState.SUCCESS,
      };
    }

    case ActionTypes.STOP_MONITORING_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.STOP_MONITORING_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.STOP_MONITORING_SUCCESS: {

      return {
        ...state,
        ACTIVE_PATIENTS_DATA: state.ACTIVE_PATIENTS_DATA?.map((x) => {
          if (x && x["patientId"] === action.payload["patient"]["data"]) {
            x.biosensorStatus = "STOPPED";
            return x;
          } else {
            return x;
          }
        }),
        tableState: TableState.SUCCESS,
      };
    }

    case ActionTypes.SET_SELECTED_PATIENTS_IDs_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.SET_SELECTED_PATIENTS_IDs_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.SET_SELECTED_PATIENTS_IDs_SUCCESS: {
      return {
        ...state,
        PATIENT_IDS: action.payload["patientIds"],
        tableState: TableState.SUCCESS,
      };
    }

    case ActionTypes.SET_SELECTED_TAB_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.SET_SELECTED_TAB_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.SET_SELECTED_TAB_SUCCESS: {
      return {
        ...state,
        SELECTED_TAB: action.payload["selectedTab"],
        tableState: TableState.SUCCESS,
      };
    }

    case ActionTypes.ASSIGN_GROUP_REQUEST: {
      console.log(state);
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.ASSIGN_GROUP_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.ASSIGN_GROUP_SUCCESS: {
      return {
        ...state,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.DISCHARGE_PATIENT_REQUEST: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }

    case ActionTypes.DISCHARGE_PATIENT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE,
      };
    }

    case ActionTypes.DISCHARGE_PATIENT_SUCCESS: {
      return {
        ...state,
        ACTIVE_PATIENTS_DATA: state?.ACTIVE_PATIENTS_DATA?.filter(
        (x) => {
        if (x.patientId !== action.payload["dischargedPatient"]["data"]) {
        return x;
        }
        }
        ),
        total: state?.total - 1,
        tableState: TableState.SUCCESS,
      };
    }
  }
}
