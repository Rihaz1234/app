import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  MiscellaneousSettingsState,
  miscellaneousSettingsFeatureKey,
} from "./miscellaneous-settings.reducer";

const getMiscellaneousSettingsState =
  createFeatureSelector<MiscellaneousSettingsState>(
    miscellaneousSettingsFeatureKey
  );

export const getMiscellaneousSettings = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.MISCELLANEOUS_SETTINGS_DATA
);

export const getSpo2Settings = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.spo2ConfigData
);

export const getMiscellaneousError = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.error
);
export const getMiscellaneousStatus = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.status
);
export const getMiscellaneousMessage = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.message
);
export const getLoaderStatus = createSelector(
  getMiscellaneousSettingsState,
  (state) => state?.loaded
);
