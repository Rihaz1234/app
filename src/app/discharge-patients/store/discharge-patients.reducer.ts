import { DischargePatient } from "../models/discharge-patient.model";
import {
  ActionTypes,
  DischargePatientsActions,
} from "./discharge-patients.actions";
import { TableState } from "src/app/life-signals/_models/ls-column.model";


export const dischargePatientsFeatureKey = "dischargePatient";

export interface State {
  DISCHARGE_PATIENTS: DischargePatient[];
  error: string;
  total : number;
  tableState : TableState
}

const initialActivePatientState: State = {
  DISCHARGE_PATIENTS: [],
  error: "",
  total : 0,
  tableState : TableState.DEFAULT
};

export function DischargePatientsReducer(
  state: State = initialActivePatientState,
  action: DischargePatientsActions
) {
  switch (action.type) {
    case ActionTypes.LOAD_DISCHARGE_PATIENTS_REQUEST: {
      return {
        ...state,
        error: null,
        tableState : TableState.LOADING
      };
    }

    case ActionTypes.LOAD_DISCHARGE_PATIENTS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        total : 0,
        tableState : TableState.FAILURE
      };
    }

    case ActionTypes.LOAD_DISCHARGE_PATIENTS_SUCCESS: {
      return {
        ...state,
        DISCHARGE_PATIENTS: action.payload["data"]["items"],
        total : action.payload["data"]["total"],
        tableState : TableState.SUCCESS
      };
    }
  }
}
