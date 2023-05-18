let preferenceUnit = JSON.parse(sessionStorage.getItem('userPreference'))?.units;
export const priorityColorCode: any = {
  HIGH: "#FF4C4C",
  LOW: "#FAFF00",
  MEDIUM: "#FAFF00",
};

// Alert Settings Priority Dropdwon Options
export const alertPriorityOptions: any = [
  {
    value: "HIGH",
    label: "HIGH",
  },
  {
    value: "MEDIUM",
    label: "MEDIUM",
  },
  {
    value: "LOW",
    label: "LOW",
  },
];
// Arrhythmia Alert Settings Priority Dropdwon Options
export const arrhythmiaAlertPriorityOptions: any = [
  {
    value: "HIGH",
    label: "HIGH",
  },
  {
    value: "MEDIUM",
    label: "MEDIUM",
  },
  {
    value: "LOW",
    label: "LOW",
  },
  {
    value: "INFORMATIONAL",
    label: "INFORMATIONAL",
  },
];
// Parameter Alert Settings - Row Items
export const ArrhythmiaParameterAlertItems: any = [
  {
    alerts: "SINUS BRADYCARDIA",
    key: "SINUS_BRADYCARDIA",
    unit: "bpm", 
  },
  {
    alerts: "SINUS TACHYCARDIA",
    key: "SINUS_TACHYCARDIA",
    unit: "bpm",
  },
  {
    alerts: "VENTRICULAR FLUTTER",
    key: "VENTRICULAR_FLUTTER",
  },
  {
    alerts: "VENTRICULAR TACHYCARDIA",
    key: "VENTRICULAR_TACHYCARDIA",
  },
  {
    alerts: "VENT RHYTHM",
    key: "IDIOVENTRICULAR_RYTHM",
  },
  {
    alerts: "SUPRAVENTRICULAR TACHYCARDIA",
    key: "SUPRAVENTRICULAR_TACHYCARDIA",
  },
  {
    alerts: "AFIB FLUTTER",
    key: "AFIB_FLUTTER",
  },
  {
    alerts: "JUNCTIONAL TACHYCARDIA",
    key: "JUNCTIONAL_TACHYCARDIA",
  },
  {
    alerts: "FIRST DEGREE AV BLOCK",
    key: "FIRST_DEGREE_AV_BLOCK",
  },
  {
    alerts: "SECOND DEGREE AV BLOCK TYPE I",
    key: "SECOND_DEGREE_AV_BLOCK_TYPE_I",
  },
  {
    alerts: "SECOND DEGREE AV BLOCK TYPE II",
    key: "SECOND_DEGREE_AV_BLOCK_TYPE_II",
  },
  {
    alerts: "PAUSE",
    key: "PAUSE",
  },
  {
    alerts: "V COUPLET",
    key: "V_COUPLET",
  },
  {
    alerts: "V BIGEMINY",
    key: "V_BIGEMINY",
  },
  {
    alerts: "V TRIGEMINY",
    key: "V_TRIGEMINY",
  },
  {
    alerts: "PVC RATE",
    key: "PVC_RATE",
    unit: "rate/min",
  },
  {
    alerts: "PAC RATE",
    key: "PAC_RATE",
    unit: "rate/min",
  },
  {
    alerts: "PVC",
    key: "PVC",
  },
  {
    alerts: "PAC",
    key: "PAC",
  }
];
// Parameter Alert Settings - Row Items
export const parameterAlertItems: any = [
  {
    alerts: "Heart Rate",
    key: "HR",
    unit: "bpm",
  },
  {
    alerts: "Respiration Rate",
    key: "RR",
    unit: "brpm",
  },
  {
    alerts: "SpO2",
    key: "SPO2",
    unit: "%",
  },
  {
    alerts: "Body Temperature",
    key: "BODYTEMP",
    unit: preferenceUnit === 'SI'? "°C": "°F",
  },
  {
    alerts: "Systolic",
    key: "BPSYS",
    unit: "mmHg",
  },
  {
    alerts: "Diastolic",
    key: "BPDIA",
    unit: "mmHg",
  },
  // {
  //   alerts: "Mean",
  //   key: "BP",
  //   unit: "mmHg",
  // },
  {
    alerts: "Pulse Rate",
    key: "PR",
    unit: "/Min",
  },
  {
    alerts: "Skin Temperature",
    key: "SKINTEMP",
    unit: preferenceUnit === 'SI'? "°C": "°F",
  },
  {
    alerts: "Posture",
    key: "POSTURE_ALERT",
    unit: '',
  },
];
export const AlertHistoryItems: any = [
  {
    alerts: "Heart Rate",
    key: "HR",
    unit: "bpm",
  },
  {
    alerts: "Respiration Rate",
    key: "RR",
    unit: "brpm",
  },
  {
    alerts: "SpO2",
    key: "SPO2",
    unit: "%",
  },
  {
    alerts: "Body Temperature",
    key: "BODYTEMP",
    unit: preferenceUnit === 'SI'? "°C": "°F",
  },
  {
    alerts: "Systolic",
    key: "BPSYS",
    unit: "mmHg",
  },
  {
    alerts: "Diastolic",
    key: "BPDIA",
    unit: "mmHg",
  },
  {
    alerts: "Pulse Rate",
    key: "PR",
    unit: "/Min",
  },
  {
    alerts: "Skin Temperature",
    key: "SKINTEMP",
    unit: preferenceUnit === 'SI'? "°C": "°F",
  },
  {
    alerts: "BP",
    key: "BP",
    unit: "%",
  },
  {
    alerts: "Posture",
    key: "POSTURE_ALERT",
    unit: 'hrs',
  },
];

export const technicalAlertItems: any = [

  {
    alerts: "Biosensor Disconnected",
    unit: "Sec",
    units: "Min",
    key: "BIOSENSOR_DISCONNECTED",
  },

  {
    alerts: "Relay Disconnected",
    unit: "Sec",
    units: "Min",
    key: "RELAY_DISCONNECTED",
  },

  {
    alerts: "Battery Low",
    unit: "Sec",
    units: "Min",
    key: "LOW_BATTERY",
  },

  {
    alerts: "Invalid HR",
    unit: "Sec",
    units: "Min",
    key: "COMPUTE_HR_ERROR",
  },
  /* {
    alerts: "Temperature Calibration Invalid",
    unit: "Sec",
    units: "Min",
    key: "TEMPERATURE_CALIBRATION",
  }, */

  {
    alerts: "Invalid RR ",
    unit: "Sec",
    units: "Min",
    key: "COMPUTE_RR_ERROR",
  },

  {
    alerts: "Invalid SpO2",
    unit: "Sec",
    units: "Min",
    key: "COMPUTE_SPO2_ERROR",
  },
  {
    alerts: "Lead Off",
    unit: "Sec",
    units: "Min",
    key: "LEAD_OFF",
  },
  {
    alerts: "Body Temp Unavailable",
    unit: "Sec",
    units: "Min",
    key: "COMPUTE_BODY_TEMP_ERROR",
  },
  {
    alerts: "Replace Biosensor",
    unit: "",
    units: "",
    key: "REPLACE_BIOSENSOR",
  },
  {
    alerts: "Onboard Failed",
    unit: "",
    units: "",
    key: "ONBOARD_FAIL_TECH_ALERT_PATIENT_IN_DISCHARGED_STATE",
  },
  {
    alerts: "Invalid SPO2/PR",
    unit: "",
    units: "",
    key: "COMPUTE_SPO2_PR_ERROR",
  },
];

export const priorityAlertItems: any = [
  {
    alerts: "High",
    unit: "Min",
    key: "HIGH",
    percentage: "%",
  },

  {
    alerts: "Medium",
    unit: "Min",
    key: "MEDIUM",
    percentage: "%",
  },

  {
    alerts: "Low",
    unit: "Min",
    key: "LOW",
    percentage: "%",
  },
];


// UI access and permissions
// CLINICAL_FACILITY_ADMIN       = "CFA"
// CLINICAL_FACILITY_ADMIN_CLONE = "CFAC"
// GENERAL_CLINICIAN             = "GC"
// SUPERVISORY_CLINICIAN         = "SC"
// PHYSICIAN                     = "PHY"
export const uiAccessRoles = {
  ALERT_CONFIGURATIONS: {
    ALERT_DESTINATIONS: {
      PAGE_VIEW: ["SC", "PHY", "GC", "CFA", "CFAC"],
      EDIT: ["SC", "CFA", "CFAC"],
      PATIENT: {
        PAGE_VIEW: ["SC", "PHY", "GC"],
        EDIT: ["GC", "PHY"],
      },
    },
    ALERT_NOTIFICATIONS: {
      PAGE_VIEW: ["CFA", "CFAC"],
    },
    ALERT_PARAMETER: {
      PAGE_VEW: ["CFA", "CFAC", "SC", "PHY", "GC"],
      EDIT: ["CFA", "CFAC", "SC"],
    },
    ARRHYTHMIA_PARAMETER: {
      PAGE_VEW: ["CFA", "CFAC", "SC", "PHY", "GC"],
      EDIT: ["CFA", "CFAC", "SC"],
    },
    ALERT_TECHNICAL: {
      PAGE_VEW: ["CFA", "CFAC", "SC", "PHY", "GC"],
      EDIT: ["CFA", "CFAC", "SC"],
    },
    ALERT_PRIORITY: {
      PAGE_VEW: ["CFA", "CFAC", "SC", "PHY", "GC"],
      EDIT: ["CFA", "CFAC", "SC"],
    },
    PARAMETER_ALERT: {
      PAGE_VEW: ["GC", "PHY"],
      EDIT: ["GC", "PHY"],
    },
    ARRHYTHMIA_ALERT: {
      PAGE_VEW: ["GC", "PHY"],
      EDIT: ["GC", "PHY"],
    },
    TECHNICAL_ALERT: {
      PAGE_VEW: ["GC", "PHY"],
      EDIT: ["GC", "PHY"],
    },
    OTHER_SETTINGS: {
      PAGE_VEW: ["GC", "PHY"],
      EDIT: ["GC", "PHY"],
  },
  },
};

export const alertConfigMinMaxValues = {
  parameterAlerts: {
    HR: {
      MIN: {
        HighThr: 60,
        CondDelay: 20,
        LowThr: 30,
      },
      MAX: {
        HighThr: 250,
        CondDelay: 300,
        LowThr: 160,
      },
    },
    RR: {
      MIN: {
        HighThr: 10,
        CondDelay: 50,
        LowThr: 6,
      },
      MAX: {
        HighThr: 60,
        CondDelay: 300,
        LowThr: 55,
      },
    },
    SPO2: {
      MIN: {
        HighThr: 95,
        CondDelay: 20,
        LowThr: 70,
      },
      MAX: {
        HighThr: 100,
        CondDelay: 300,
        LowThr: 95,
      },
    },
    BODYTEMP: {
      MIN: {
        HighThr: preferenceUnit === 'SI'? 37 : 98.6,
        CondDelay: 60,
        LowThr: preferenceUnit === 'SI'? 32: 89.6,
      },
      MAX: {
        HighThr: preferenceUnit === 'SI'? 43 : 109.4,
        CondDelay: 300,
        LowThr: preferenceUnit === 'SI'? 36 : 96.8,
      },
    },
    BPSYS: {
      MIN: {
        HighThr: 75,
        LowThr: 35,
      },
      MAX: {
        HighThr: 240,
        LowThr: 150,
      },
    },
    BPDIA: {
      MIN: {
        HighThr: 50,
        LowThr: 15,
      },
      MAX: {
        HighThr: 180,
        LowThr: 50,
      },
    },
    PR: {
      MIN: {
        HighThr: 60,
        CondDelay: 20,
        LowThr: 30,
      },
      MAX: {
        HighThr: 250,
        CondDelay: 300,
        LowThr: 120,
      },
    },
    SKINTEMP: {
      MIN: {
        HighThr: preferenceUnit === 'SI'? 20: 68,
        CondDelay: 60,
        LowThr: preferenceUnit === 'SI'? 15: 59,
      },
      MAX: {
        HighThr: preferenceUnit === 'SI'? 45: 113,
        CondDelay: 300,
        LowThr: preferenceUnit === 'SI'? 33: 91.4,
      },
    },
    POSTURE_ALERT: {
      MIN: {
        HighThr: '',
        CondDelay: 1,
        LowThr: '',
      },
      MAX: {
        HighThr: '',
        CondDelay: 168,
        LowThr: '',
      },
    },
  },
  technicalAlert: {
    LEAD_OFF: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 5,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    BIOSENSOR_DISCONNECTED: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    RELAY_DISCONNECTED: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    LOW_BATTERY: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    /* TEMPERATURE_CALIBRATION: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    }, */
    COMPUTE_HR_ERROR: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 5,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    COMPUTE_RR_ERROR: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    COMPUTE_SPO2_ERROR: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
    COMPUTE_BODY_TEMP_ERROR: {
      MIN: {
        Frequency_UnAck: 5,
        CondDelay: 15,
        Frequency_Ack: 5,
      },
      MAX: {
        Frequency_UnAck: 720,
        CondDelay: 300,
        Frequency_Ack: 720,
      },
    },
  },
  priorityAlert: {
    HIGH: {
      MIN: {
        Frequency_UnAck: 5,
        Frequency_Ack: 5,
        Percentage_Ack: 3,
        Percentage_UnAck: 3,
      },
      MAX: {
        Frequency_UnAck: 720,
        Frequency_Ack: 720,
        Percentage_Ack: 100,
        Percentage_UnAck: 100,
      },
    },
    MEDIUM: {
      MIN: {
        Frequency_UnAck: 5,
        Frequency_Ack: 5,
        Percentage_Ack: 3,
        Percentage_UnAck: 3,
      },
      MAX: {
        Frequency_UnAck: 720,
        Frequency_Ack: 720,
        Percentage_Ack: 100,
        Percentage_UnAck: 100,
      },
    },
    LOW: {
      MIN: {
        Frequency_UnAck: 5,
        Frequency_Ack: 5,
        Percentage_Ack: 3,
        Percentage_UnAck: 3,
      },
      MAX: {
        Frequency_UnAck: 720,
        Frequency_Ack: 720,
        Percentage_Ack: 100,
        Percentage_UnAck: 100,
      },
    },
  },
};

export const isAllowedRole = (allowedRoles: any, userRoles: any) => {
  let isAllowed = false;
  if (allowedRoles.some((ai: any) => userRoles.includes(ai))) {
    isAllowed = true;
  }
  return isAllowed;
};
export const MY_MOMENT_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric',
    minute: 'numeric', hourCycle: 'h23' },
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: { hour: 'numeric', minute: 'numeric', hourCycle: 'h23' },
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
}
export const postures = [
  "Supine",
  "Prone",
  "Lying on Left",
  "Lying on Right",
];
