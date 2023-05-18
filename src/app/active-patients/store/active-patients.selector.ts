import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, patientsFeatureKey } from "./active-patients.reducer";

const getPatientState = createFeatureSelector<State>(patientsFeatureKey);

export const selectActivePatientsList = createSelector(
  getPatientState,
  (state) => {
    return {
      ...state,
      error: state?.error,
      tableState: state?.tableState
    }
  }
);

export const selectUnassignedPatientsList = createSelector(
  getPatientState,
  (state) => {
    return {
      ...state,
      error: state?.error,
      tableState: state?.tableState
    }
  }
);

export const selectActivePatientsError = createSelector(
  getPatientState,
  (state) => state?.error
);

export const createNewPatient = createSelector(
  getPatientState,
  (state) => {
    return{
      PATIENT : state?.PATIENT,
      error : state?.error,
      addEditState: state?.addEditState
    }
  }
);

export const updatePatient = createSelector(
  getPatientState,
  (state) => state.PATIENT
);

export const assignGroupPatient = createSelector(
  getPatientState,
  (state) => state.PATIENT
);

export const dischargePatient = createSelector(
  getPatientState,
  (state) => state.PATIENT
);

export const stopMonitoring = createSelector(
  getPatientState,
  (state) => state.PATIENT
);

export const doctorsList = createSelector(
  getPatientState,
  (state) => state?.DOCTORS
);

export const getPatientIds = createSelector(
  getPatientState,
  (state) => state.PATIENT_IDS
);

export const selectedTab = createSelector(
  getPatientState,
  (state) => state.SELECTED_TAB
)
