import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  ManageRelaysState,
  manageRelaysFeatureKey,
} from "./manage-relays.reducer";

const getManageRelaysState = createFeatureSelector<ManageRelaysState>(
  manageRelaysFeatureKey
);

export const getSPRelayList = createSelector(
  getManageRelaysState,
  (state) => state?.SINGLE_PATIENT_RELAYS
);

export const getError = createSelector(
  getManageRelaysState,
  (state) => state?.error
);
export const getSPRelayCount = createSelector(
  getManageRelaysState,
  (state) => state?.SP_RELAY_COUNT
);
export const getLoaderStatus = createSelector(
  getManageRelaysState,
  (state) => state?.loaded
);
export const getMPRelayList = createSelector(
  getManageRelaysState,
  (state) => state?.MULTI_PATIENT_RELAYS
);
export const getMPRelayCount = createSelector(
  getManageRelaysState,
  (state) => state?.MP_RELAY_COUNT
);
export const getRelayConfiguration = createSelector(
  getManageRelaysState,
  (state) => state?.RELAY_CONFIGURATION
);
export const getCGRelayList = createSelector(
    getManageRelaysState,
    (state) => state?.CARE_GIVER_RELAYS
);
export const getCGRelayCount = createSelector(
    getManageRelaysState,
    (state) => state?.CG_RELAY_COUNT
);
