import { Action } from "@ngrx/store";
import { AlertConfigurationActionTypes } from "./alert-configuration.types";
import {
  AlertConfiguration,
  ArrhythmiaAlertConfiguration,
  AlertConfigurationData,
  AlertDestinationConfiguration,
  ClinicalFacilityContactList,
} from "./alert-configuration.models";

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

export class loadGroupAlertConfigurationRequestAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}
export class loadGroupAlertConfigurationFailureAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadGroupAlertConfigurationSuccessAction implements Action {
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertConfiguration }) {}
}
// Arrhythmia group alert
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
//----
export class loadGroupDestinationAlertConfigurationSuccessAction
  implements Action
{
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_SUCCESS;
  constructor(public payload: { data: AlertDestinationConfiguration }) {}
}
export class loadGroupDestinationAlertConfigurationFailureAction
  implements Action
{
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class loadGroupDestinationAlertConfigurationRequestAction
  implements Action
{
  readonly type =
    AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_REQUEST;
  constructor(public payload: { url: string }) {}
}

export class setGroupAlertId implements Action {
  readonly type = AlertConfigurationActionTypes.SET_GROUP_ALERT_ID;
  constructor(public payload: { groupId: string }) {}
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

export type AlertConfigurationActions =
  | loadAlertConfigurationFailureAction
  | loadAlertConfigurationSuccessAction
  | loadAlertConfigurationRequestAction
  | updateAlertConfigurationFailureAction
  | updateAlertConfigurationSuccessAction
  | updateAlertConfigurationRequestAction
  | resetAlertConfigurationFailureAction
  | resetAlertConfigurationSuccessAction
  | resetAlertConfigurationRequestAction
  | loadDestinationAlertConfigurationSuccessAction
  | loadDestinationAlertConfigurationFailureAction
  | loadDestinationAlertConfigurationRequestAction
  | loadGroupDestinationAlertConfigurationSuccessAction
  | loadGroupDestinationAlertConfigurationFailureAction
  | loadGroupDestinationAlertConfigurationRequestAction
  | loadGroupAlertConfigurationRequestAction
  | loadGroupAlertConfigurationFailureAction
  | loadGroupAlertConfigurationSuccessAction
  | loadArrhythmiaAlertConfigurationRequestAction
  | loadArrhythmiaAlertConfigurationFailureAction
  | loadArrhythmiaAlertConfigurationSuccessAction
  | setGroupAlertId
  | loadClinicalFacilityContactsRequestAction
  | loadClinicalFacilityContactsFailureAction
  | loadClinicalFacilityContactsSuccessAction;
