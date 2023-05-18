import { AlertConfigurationActions } from "./alert-configuration.actions";
import {
  AlertConfigurationData,
  AlertDestinationConfigData,
  ClinicalFacilityContactListData,ArrhythmiaAlertConfigurationData,
} from "./alert-configuration.models";
import { AlertConfigurationActionTypes } from "./alert-configuration.types";

export interface AlertConfigurationState {
  alert_configurations: AlertConfigurationData;
  arrhythmiaConfigurations: ArrhythmiaAlertConfigurationData;
  error: string;
  status: string;
  message: string;
  loaded: boolean
  alert_destinations: AlertDestinationConfigData;
  groupIdSelected: string;
  contacts: ClinicalFacilityContactListData;
}

export const initialAlertConfigurationState: AlertConfigurationState = {
  arrhythmiaConfigurations: {
    ArrhythmiaId: "",
    Setting: {
      SINUS_BRADYCARDIA: {
        Enabled: true,
        Priority: "HIGH",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    SINUS_TACHYCARDIA: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    VENTRICULAR_FLUTTER: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    VENTRICULAR_TACHYCARDIA: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    IDIOVENTRICULAR_RYTHM: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    SUPRAVENTRICULAR_TACHYCARDIA: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    AFIB_FLUTTER: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    JUNCTIONAL_TACHYCARDIA: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    FIRST_DEGREE_AV_BLOCK: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    SECOND_DEGREE_AV_BLOCK_TYPE_I: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    SECOND_DEGREE_AV_BLOCK_TYPE_II: {
      Enabled: true,
      Priority: "",
      LowThr: 0,
      HighThr: 0,
      CondDelay: 0,
      HighUnit: "",
      LowUnit: "",
      Thr: 0,
  },
    PAUSE: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    V_COUPLET: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    V_BIGEMINY: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    V_TRIGEMINY: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    PVC_RATE: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    PAC_RATE: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    PVC: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    PAC: {
        Enabled: true,
        Priority: "",
        LowThr: 0,
        HighThr: 0,
        CondDelay: 0,
        HighUnit: "",
        LowUnit: "",
        Thr: 0,
    },
    },
    FacilityId: "",
    FacilityName: "",
    PatientId: "",
    GroupId: "",
    IsForPatient: true,
    createdDateTime: "",
    modifiedDateTime: "",
  },
  alert_configurations: {
    AlertId: "",
    FacilityId: "",
    FacilityName: "",
    GroupId: "",
    IsForPatient: false,
    PatientId: "",
    Setting: {
      Param: {
        PhyParam: {
          HR: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          RR: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          PR: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          SPO2: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          BPSYS: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          BPDIA: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          BP: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          SKINTEMP: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          BODYTEMP: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
          CardiacStandStill: {
            Enabled: false,
            Priority: "",
            LowThr: 0,
            HighThr: 0,
            CondDelay: 0
          },
        },
        TechParam: {
          LEAD_OFF: {
            Enabled: false,
          },
          BIOSENSOR_DISCONNECTED: {
            Enabled: false,
          },
          RELAY_DISCONNECTED: {
            Enabled: false,
          },
          LOW_BATTERY: {
            Enabled: false,
          },
          /* TEMPERATURE_CALIBRATION:{
            Enabled: false,
          }, */
          COMPUTE_HR_ERROR: {
            Enabled: false,
          },
          COMPUTE_RR_ERROR: {
            Enabled: false,
          },
          COMPUTE_SPO2_ERROR: {
            Enabled: false,
          },
          COMPUTE_BODY_TEMP_ERROR: {
            Enabled: false,
          },
        },
      },
      Common: {
        PhyCommon: {
          HIGH: {
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
            Percentage_UnAck: 0,
            Percentage_Ack: 0,
          },
          MEDIUM: {
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
            Percentage_UnAck: 0,
            Percentage_Ack: 0,
          },
          LOW: {
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
            Percentage_UnAck: 0,
            Percentage_Ack: 0,
          },
        },
        TechCommon: {
          LEAD_OFF: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          BIOSENSOR_DISCONNECTED: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          RELAY_DISCONNECTED: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          LOW_BATTERY: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          /* TEMPERATURE_CALIBRATION:{
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          }, */
          COMPUTE_HR_ERROR: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          COMPUTE_RR_ERROR: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          COMPUTE_SPO2_ERROR: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
          COMPUTE_BODY_TEMP_ERROR: {
            CondDelay: 0,
            Frequency_UnAck: 0,
            Frequency_Ack: 0,
          },
        },
      },
    },
    auditloginfotype: {
      CreatedBy: "",
      CreatedById: "",
      ModifiedBy: "",
      ModifiedById: "",
      CreatedDateTime: "",
      ModifiedDateTime: "",
    },
  },
  error: "",
  status: "",
  message: "",
  loaded: false,
  alert_destinations: {
    AlertDestId: "",
    FacilityId: "",
    GroupId: "",
    PatientId: "",
    Setting: {
      AlertSMS: "",
      AlertWhatsApp: "",
      AlertEmail: "",
      AlertCaregiverApp: "",
      AlertSMSEnabled: false,
      AlertWhatsAppEnabled: false,
      AlertEmailEnabled: false,
      AlertCaregiverAppEnabled: false,
    },
    SettingTech: {
      AlertSMS: "",
      AlertWhatsApp: "",
      AlertEmail: "",
      AlertCaregiverApp: "",
      AlertSMSEnabled: false,
      AlertWhatsAppEnabled: false,
      AlertEmailEnabled: false,
      AlertCaregiverAppEnabled: false,
    },
    UserData: [],
    auditloginfotype: {
      CreatedBy: "",
      CreatedById: "",
      ModifiedBy: "",
      ModifiedById: "",
      CreatedDateTime: "",
      ModifiedDateTime: "",
    },
    NotificationMessage: "",
  },
  groupIdSelected: null,
  contacts: [],
};

export const alertConfigurationKey = "alertConfiguration";

export function AlertConfigurationReducer(
  state: AlertConfigurationState = initialAlertConfigurationState,
  action: AlertConfigurationActions
) {
  switch (action.type) {
    case AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false
      };
    }

    case AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        alert_configurations: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true
      };
    }
    case AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false
      };
    }

    case AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        alert_destinations: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true
      };
    }
    case AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false
      };
    }

    case AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AlertConfigurationActionTypes.LOAD_GROUP_DESTINATION_ALERT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        alert_destinations: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true
      };
    }
    case AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false
      };
    }

    case AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AlertConfigurationActionTypes.LOAD_GROUP_ALERT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        alert_configurations: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true
      };
    }
    case AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false
      };
    }

    case AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        arrhythmiaConfigurations: action.payload.data.data,
        message: action.payload.data.message,
        status: action.payload.data.status,
        loaded: true
      };
    }
    case AlertConfigurationActionTypes.SET_GROUP_ALERT_ID: {
      return {
        ...state,
        groupIdSelected: action.payload,
      };
    }
    case AlertConfigurationActionTypes.CF_CONATCT_LIST_SUCCESS: {
      return {
        ...state,
        contacts: action.payload.data.data,
      };
    }
    case AlertConfigurationActionTypes.CF_CONATCT_LIST_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case AlertConfigurationActionTypes.CF_CONATCT_LIST_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
