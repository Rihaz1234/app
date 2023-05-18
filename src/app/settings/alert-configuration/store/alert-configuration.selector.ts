import { createFeatureSelector, createSelector } from "@ngrx/store";

import {
  AlertConfigurationState,
  alertConfigurationKey,
} from "./alert-configuration.reducer";

const getAlertConfigurationsState =
  createFeatureSelector<AlertConfigurationState>(alertConfigurationKey);

export const getAlertConfigurations = createSelector(
  getAlertConfigurationsState,
  (state) => state?.alert_configurations
);

export const getArrhythmiaAlertConfigurations = createSelector(
  getAlertConfigurationsState,
  (state) => state?.arrhythmiaConfigurations
);

export const getDestinationAlertConfigurations = createSelector(
  getAlertConfigurationsState,
  (state) => state?.alert_destinations
);

export const getAlertConfigurationError = createSelector(
  getAlertConfigurationsState,
  (state) => state?.error
);
export const getAlertConfigurationStatus = createSelector(
  getAlertConfigurationsState,
  (state) => state.status
);
export const getAlertConfigurationMessage = createSelector(
  getAlertConfigurationsState,
  (state) => state?.message
);

export const getAlertGroupId = createSelector(
  getAlertConfigurationsState,
  (state) => state?.groupIdSelected
);

export const getClinicalFacilityContacts = createSelector(
  getAlertConfigurationsState,
  (state) => state?.contacts
);
export const getLoaderStatus = createSelector(
    getAlertConfigurationsState,
    (state) => state?.loaded
);
