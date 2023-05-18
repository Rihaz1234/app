import { createFeatureSelector, createSelector } from "@ngrx/store";

import { patientAlertConfigurationState, patientAlertConfigurationKey } from './alert-configuration.reducer';

const getAlertConfigurationsState =
  createFeatureSelector<patientAlertConfigurationState>(patientAlertConfigurationKey);

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
  (state) => state.error
);
export const getAlertConfigurationStatus = createSelector(
  getAlertConfigurationsState,
  (state) => state.status
);
export const getAlertConfigurationMessage = createSelector(
  getAlertConfigurationsState,
  (state) => state.message
);
export const getAlertGroupId = createSelector(
  getAlertConfigurationsState,
  (state) => state?.groupIdSelected
);

export const getClinicalFacilityContacts = createSelector(
  getAlertConfigurationsState,
  (state) => state?.contacts
);

export const getMiscellaneousSettings = createSelector(
    getAlertConfigurationsState,
    state => state?.MISCELLANEOUS_SETTINGS_DATA
);

export const getMiscellaneousError = createSelector(
    getAlertConfigurationsState,
    state => state.error
);
export const getMiscellaneousStatus = createSelector(
    getAlertConfigurationsState,
    state => state.status
);
export const getMiscellaneousMessage = createSelector(
    getAlertConfigurationsState,
    state => state.message
);
export const getLoaderStatus = createSelector(
    getAlertConfigurationsState,
    (state) => state?.loaded
  );
export const getAlertHistory = createSelector(
    getAlertConfigurationsState,
    state => state?.alert_history
);
export const getAlertHistoryLoader = createSelector(
    getAlertConfigurationsState,
    state => state?.historyLoaded
);
export const getEventList = createSelector(
    getAlertConfigurationsState,
    state => state?.event_list
);
export const getEventListLoader = createSelector(
    getAlertConfigurationsState,
    state => state?.eventListLoaded
);
export const getEventListCount = createSelector(
    getAlertConfigurationsState,
    state => state?.eventListCount
);
export const getTableState = createSelector(
    getAlertConfigurationsState,
    state => state?.tableState
);
