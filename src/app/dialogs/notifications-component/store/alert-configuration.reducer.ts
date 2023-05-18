import {AlertConfigurationActions} from "./alert-configuration.actions";
import {
    AlertConfigurationData,
    AlertDestinationConfigData,
    ArrhythmiaAlertConfigurationData,
    AlertHistoryData,
    ClinicalFacilityContactListData,
    EventListData,
    MiscellaneousData
} from "./alert-configuration.models";
import {AlertConfigurationActionTypes} from './alert-configuration.types';
import {TableState} from "../../../life-signals/_models/ls-column.model";


export interface patientAlertConfigurationState {
    alert_configurations: AlertConfigurationData;
    arrhythmiaConfigurations: ArrhythmiaAlertConfigurationData;
    error: string;
    status: string;
    message: string;
    alert_destinations: AlertDestinationConfigData,
    groupIdSelected: string,
    contacts: ClinicalFacilityContactListData,
    MISCELLANEOUS_SETTINGS_DATA: MiscellaneousData;
    loaded: boolean;
    alert_history: AlertHistoryData;
    historyLoaded: boolean;
    event_list: EventListData[];
    eventListLoaded: boolean;
    eventListCount: number;
    tableState: TableState;
}

const initialAlertConfigurationState: patientAlertConfigurationState = {
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
    modifiedDateTime: "",
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
    error: '',
    status: '',
    message: '',
    loaded: false,
    historyLoaded: false,
    tableState: TableState.DEFAULT,
    
    MISCELLANEOUS_SETTINGS_DATA: {
        thirdPartyDeviceSettings: [],
        ecgFilterSettings: {
            ecgFilterSetting: '',
            isActive: false
        },
        bioSensorConfigSettings: [],
        otherSettings: {
            autoGeneratePatientId: false,
            enableAccessToSPPHY: false,
            facilityName: '',
            facilityLogo: '',
            emr: ''
        },
        facilityId: '0',
        groupId: '0',
        patientId: '0',
        alertId: '0',
        miscSettingsId: "",
        modifiedDateTime: ""


    },
    alert_destinations: {
        AlertDestId: '',
        FacilityId: '',
        GroupId: '',
        PatientId: '',
        Setting: {
            AlertSMS: '',
            AlertWhatsApp: '',
            AlertEmail: '',
            AlertCaregiverApp: '',
            AlertSMSEnabled:false,
            AlertWhatsAppEnabled: false,
            AlertEmailEnabled: false,
            AlertCaregiverAppEnabled: false,
        },
        SettingTech: {
            AlertSMS: '',
            AlertWhatsApp: '',
            AlertEmail: '',
            AlertCaregiverApp: '',
            AlertSMSEnabled:false,
            AlertWhatsAppEnabled: false,
            AlertEmailEnabled: false,
            AlertCaregiverAppEnabled: false,
        },
        UserData: [],
        auditloginfotype: {
            CreatedBy: '',
            CreatedById: '',
            ModifiedBy: '',
            ModifiedById: '',
            CreatedDateTime: '',
            ModifiedDateTime: ''
        },
        NotificationMessage: ''
      },
   
  groupIdSelected: null,
  contacts: [],
  alert_history: {
    patientId: "",
    topAlerts: []
  },
  event_list: [],
  eventListLoaded: false,
  eventListCount: 0
};

export const patientAlertConfigurationKey = "patientAlertConfiguration";

export function AlertConfigurationReducer(state: patientAlertConfigurationState = initialAlertConfigurationState,
    action: AlertConfigurationActions) {

    switch (action.type) {
      case AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_REQUEST: {
        return {
            ...state, error: null, loaded: false
        };
    }

    case AlertConfigurationActionTypes.LOAD_ARRHYTHMIA_ALERT_CONFIGURATION_FAILURE: {
        return {
            ...state, error: action.payload
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
        case AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_REQUEST: {
            return {
                ...state, error: null, loaded: false
            };
        }

        case AlertConfigurationActionTypes.LOAD_ALERT_CONFIGURATION_FAILURE: {
            return {
                ...state, error: action.payload
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
                ...state, error: null, loaded: false
            };
        }

        case AlertConfigurationActionTypes.LOAD_DESTINATION_ALERT_CONFIGURATION_FAILURE: {
            return {
                ...state, error: action.payload
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
       
        case AlertConfigurationActionTypes.CF_CONATCT_LIST_SUCCESS: {
            return {
                ...state,
                contacts: action.payload.data.data
            };
        }
        case AlertConfigurationActionTypes.CF_CONATCT_LIST_REQUEST: {
            return {
                ...state, error: null
            };
        }
        case AlertConfigurationActionTypes.CF_CONATCT_LIST_FAILURE: {
            return {
                ...state, error: action.payload
            };
        }
        case AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_REQUEST: {
            return {
                ...state, error: null,
                loaded: false,

            };
        }

        case AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_FAILURE: {
            return {
                ...state, error: action.payload
            };
        }

        case AlertConfigurationActionTypes.LOAD_MISCELLANEOUS_SETTINGS_SUCCESS: {
            return {
                ...state, MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
                message: action.payload.data.message, status: action.payload.data.status,
                loaded: true,
            };
        }
        case AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_REQUEST: {
            return {
                ...state, error: null,
                loaded: false,
            };
        }

        case AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_FAILURE: {
            return {
                ...state, error: action.payload
            };
        }

        case AlertConfigurationActionTypes.UPDATE_MISCELLANEOUS_SETTINGS_SUCCESS: {
            return {
                ...state, MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
                message: action.payload.data.message, status: action.payload.data.status,
                loaded: true,
            };
        }
        case AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_REQUEST: {
            return {
                ...state, error: null,
                loaded: false,
            };
        }

        case AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_FAILURE: {
            return {
                ...state, error: action.payload
            };
        }

        case AlertConfigurationActionTypes.RESET_MISCELLANEOUS_SETTINGS_SUCCESS: {
            return {
                ...state, MISCELLANEOUS_SETTINGS_DATA: action.payload.data.data,
                message: action.payload.data.message, status: action.payload.data.status,
                loaded: true,
            };
        }
        case AlertConfigurationActionTypes.ALERT_HISTORY_REQUEST: {
            return {
                ...state, error: null,
                historyLoaded: false,
            };
        }

        case AlertConfigurationActionTypes.ALERT_HISTORY_FAILURE: {
            return {
                ...state, error: action.payload
            };
        }

        case AlertConfigurationActionTypes.ALERT_HISTORY_SUCCESS: {
            return {
                ...state,
                alert_history: action.payload.data.data,
                historyLoaded: true,
            };
        }
        case AlertConfigurationActionTypes.EVENT_LIST_REQUEST: {
            return {
                ...state, error: null,
                eventListLoaded: false,
                tableState: TableState.LOADING
            };
        }

        case AlertConfigurationActionTypes.EVENT_LIST_FAILURE: {
            return {
                ...state, error: action.payload,
                tableState: TableState.FAILURE
            };
        }

        case AlertConfigurationActionTypes.EVENT_LIST_SUCCESS: {
            return {
                ...state,
                event_list: action.payload.data.data.items,
                eventListLoaded: true,
                eventListCount: action.payload.data.data.total,
                tableState: TableState.SUCCESS
            };
        }
        default:
            return state;
    }
      

}



