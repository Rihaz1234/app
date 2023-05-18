import { Action } from '@ngrx/store';
import { AlertConfigurationActionTypes } from './alert-configuration.types';
import {
  AlertConfiguration, AlertConfigurationData, AlertDestinationConfiguration, AlertHistory,
  ArrhythmiaAlertConfiguration, ClinicalFacilityContactList, EventList, MiscellaneousData, MiscSettings,
} from './alert-configuration.models';

export class loadArrhythmiaAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadArrhythmiaAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadArrhythmiaAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: ArrhythmiaAlertConfiguration }) {}
}

export class loadAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertConfiguration }) {}
}

export class updateAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.UPDATE_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { data: AlertConfigurationData }) {}
}

export class updateAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.UPDATE_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class updateAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.UPDATE_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertConfiguration }) {}
}

export class resetAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.RESET_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class resetAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.RESET_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class resetAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.RESET_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertConfiguration }) {}
}

export class loadDestinationAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertDestinationConfiguration }) {}
}

export class loadDestinationAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadDestinationAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadClinicalFacilityContactsRequestAction implements Action {
  readonly type = AlertConfigurationActionTypes.CF_CONATCT_LIST_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class loadClinicalFacilityContactsFailureAction implements Action {
  readonly type = AlertConfigurationActionTypes.CF_CONATCT_LIST_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadClinicalFacilityContactsSuccessAction implements Action {
  readonly type = AlertConfigurationActionTypes.CF_CONATCT_LIST_SUCCESS;
  constructor(public payload: { data: ClinicalFacilityContactList }) {}
}
//miscellaneoous actions
export class loadMiscellaneousSettingsRequestAction implements Action {
    readonly type = AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST;
    constructor(public payload: { url: string }) {}
}

export class loadMiscellaneousSettingsFailureAction implements Action {
    readonly type = AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_FAILURE;
    constructor(public payload: { error: string }) {}
}
export class loadMiscellaneousSettingsSuccessAction implements Action {
    readonly type = AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_SUCCESS;
    constructor(public payload: { data: MiscSettings }) {}
}

export class updateMiscellaneousSettingsRequestAction implements Action {
    readonly type = AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_REQUEST;
    constructor(public payload: { data: MiscellaneousData }) {}
}

export class updateMiscellaneousSettingsFailureAction implements Action {
    readonly type = AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_FAILURE;
    constructor(public payload: { error: string }) {}
}
export class updateMiscellaneousSettingsSuccessAction implements Action {
    readonly type = AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_SUCCESS;
    constructor(public payload: { data: MiscSettings }) {}
}

export class resetMiscellaneousSettingsRequestAction implements Action {
    readonly type = AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_REQUEST;
    constructor(public payload: { url: string }) {}
}

export class resetMiscellaneousSettingsFailureAction implements Action {
    readonly type = AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_FAILURE;
    constructor(public payload: { error: string }) {}
}
export class resetMiscellaneousSettingsSuccessAction implements Action {
    readonly type = AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_SUCCESS;
    constructor(public payload: { data: MiscSettings }) {}
}
export class LoadAlertHistoryRequestAction implements Action {
    readonly type = AlertConfigurationActionTypes.ALERT_HISTORY_REQUEST;
    constructor(public payload: { params: any }) {}
}

export class LoadAlertHistoryFailureAction implements Action {
    readonly type = AlertConfigurationActionTypes.ALERT_HISTORY_FAILURE;
    constructor(public payload: { error: string }) {}
}
export class LoadAlertHistorySuccessAction implements Action {
    readonly type = AlertConfigurationActionTypes.ALERT_HISTORY_SUCCESS;
    constructor(public payload: { data: AlertHistory }) {}
}
export class LoadEventListRequestAction implements Action {
    readonly type = AlertConfigurationActionTypes.EVENT_LIST_REQUEST;
    constructor(public payload: { params: any }) {}
}

export class LoadEventListFailureAction implements Action {
    readonly type = AlertConfigurationActionTypes.EVENT_LIST_FAILURE;
    constructor(public payload: { error: string }) {}
}
export class LoadEventListSuccessAction implements Action {
    readonly type = AlertConfigurationActionTypes.EVENT_LIST_SUCCESS;
    constructor(public payload: { data: EventList }) {}
}

export type AlertConfigurationActions = loadAlertConfigurationFailureAction | loadAlertConfigurationSuccessAction
    | loadAlertConfigurationRequestAction | updateAlertConfigurationFailureAction | updateAlertConfigurationSuccessAction
    | updateAlertConfigurationRequestAction | resetAlertConfigurationFailureAction | resetAlertConfigurationSuccessAction
    | resetAlertConfigurationRequestAction | loadDestinationAlertConfigurationSuccessAction | loadDestinationAlertConfigurationFailureAction
    | loadDestinationAlertConfigurationRequestAction | loadClinicalFacilityContactsRequestAction 
    | loadClinicalFacilityContactsFailureAction | loadClinicalFacilityContactsSuccessAction | loadMiscellaneousSettingsFailureAction | loadMiscellaneousSettingsSuccessAction
    | loadMiscellaneousSettingsRequestAction | updateMiscellaneousSettingsFailureAction | updateMiscellaneousSettingsSuccessAction
    | updateMiscellaneousSettingsRequestAction | resetMiscellaneousSettingsFailureAction | resetMiscellaneousSettingsSuccessAction
    | resetMiscellaneousSettingsRequestAction | LoadAlertHistoryRequestAction | LoadAlertHistoryFailureAction | LoadAlertHistorySuccessAction
    | LoadEventListRequestAction | LoadEventListFailureAction | LoadEventListSuccessAction
    | loadArrhythmiaAlertConfigurationFailureAction | loadArrhythmiaAlertConfigurationSuccessAction | loadArrhythmiaAlertConfigurationRequestAction;




