import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  State,
  dischargePatientsFeatureKey,
} from "./discharge-patients.reducer";

const getDischargePatientState = createFeatureSelector<State>(
  dischargePatientsFeatureKey
);

export const selectDischargePatientsList = createSelector(
  getDischargePatientState,
  (state) => state
);

export const selectActivePatientsError = createSelector(
  getDischargePatientState,
  (state) => state
);
