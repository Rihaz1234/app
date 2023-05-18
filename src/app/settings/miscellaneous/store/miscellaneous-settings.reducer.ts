import { MiscellaneousData, spo2ConfigData } from "../../../interfaces/misc-settings.interface";
import {
  MiscellaneousSettingsActions,
  ActionTypes,
} from "./miscellaneous-settings.actions";

export interface MiscellaneousSettingsState {
  MISCELLANEOUS_SETTINGS_DATA: MiscellaneousData;
  spo2ConfigData: spo2ConfigData;
  error: string;
  status: string;
  message: string;
  loaded: boolean;
}

export const initialMiscellaneousSettingsState: MiscellaneousSettingsState = {
  MISCELLANEOUS_SETTINGS_DATA: {
    thirdPartyDeviceSettings: [],
    ecgFilterSettings: {
      ecgFilterSetting: "",
      isActive: false,
    },
    bioSensorConfigSettings: [],
    otherSettings: {
      autoGeneratePatientId: false,
      enableAccessToSPPHY: false,
      facilityName: "",
      facilityLogo: "",
      emr: ""
    },
    facilityId: "0",
    groupId: "0",
    miscSettingsId: 0,
  },
  error: "",
  status: "",
  message: "",
  loaded: false,
  spo2ConfigData: {
    data: {
    Spo2ConfigId: "",
    Setting: {
        Enable: false,
        Mode: "",
        OnTime: 0,
        OffTime: 0,
        DutyCycle: 0
    },
    FacilityId: "",
    FacilityName: "",
    PatientId: "",
    GroupId: "",
    IsForPatient: false,
    modifiedBy: "",
    modifiedById: "",
    modifiedDateTime: ""
},
message: "",
status: ""
  },
};


export const miscellaneousSettingsFeatureKey = "miscellaneousSettings";

export function MiscellaneousSettingsReducer(
  state: MiscellaneousSettingsState = initialMiscellaneousSettingsState,
  action: MiscellaneousSettingsActions
) {
  switch (action.type) {

    case ActionTypes.LOAD_SPO2_SETTINGS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }
    case ActionTypes.LOAD_SPO2_SETTINGS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.LOAD_SPO2_SETTINGS_SUCCESS: {
     // console.log(action.payload.data);
      return {
        ...state,
        spo2ConfigData: action.payload.data,
        message: "",
        status: action.payload.data.status ,
        loaded: true,
      };
    }

    case ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.LOAD_MISCELLANEOUS_SETTINGS_SUCCESS: {
      return {
        ...state,
        MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
        message: "",
        status: action.payload.data.status,
        loaded: true,
      };
    }

    case ActionTypes.UPDATE_SPO2_SETTINGS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.UPDATE_SPO2_SETTINGS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.UPDATE_SPO2_SETTINGS_SUCCESS: {
      return {
        ...state,
        spo2ConfigData: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true,
      };
    }

    case ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_SUCCESS: {
      return {
        ...state,
        MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true,
      };
    }
    case ActionTypes.RESET_MISCELLANEOUS_SETTINGS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.RESET_MISCELLANEOUS_SETTINGS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.RESET_MISCELLANEOUS_SETTINGS_SUCCESS: {
      return {
        ...state,
        MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
