import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  clinicalFacilityFeatureKey,
  ClinicalFacilityState,
} from "./clinical-facility-management.reducer";

const getClinicalFacilityState = createFeatureSelector<ClinicalFacilityState>(
  clinicalFacilityFeatureKey
);

export const selectClinicalFacilityList = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state
);

export const selectClinicalFacilityError = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state?.error
);

export const saveClinicalFacilitySuccess = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state?.save_cf_success
);

export const saveClinicalFacilityFailure = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state?.save_cf_error
);

export const updateClinicalFacilitySuccess = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state?.save_cf_success
);

export const updateClinicalFacilityFailure = createSelector(
  getClinicalFacilityState,
  (state: ClinicalFacilityState) => state?.save_cf_error
);
export const getClinicalFacilityAdminClone = createSelector(
    getClinicalFacilityState,
    (state: ClinicalFacilityState) => state?.CLINICAL_FACILITY_ADMIN_CLONE
);
