export interface AlertConfiguration {
  status: string;
  message: string;
  data: AlertConfigurationData;
}

export interface ArrhythmiaAlertConfiguration {
  status: string;
  message: string;
  data: ArrhythmiaAlertConfigurationData;
}

export interface ArrhythmiaAlertConfigurationData {
  ArrhythmiaId: string;
  Setting:ArrhythmiaSettings;
  FacilityId: string;
  FacilityName: string;
  PatientId: string;
  GroupId: string;
  IsForPatient: boolean;
  createdDateTime: string;
  modifiedDateTime: string;
}

export interface ArrhythmiaSettings {
  SINUS_BRADYCARDIA:ArrhythmiaParameter;
  SINUS_TACHYCARDIA:ArrhythmiaParameter;
  VENTRICULAR_FLUTTER:ArrhythmiaParameter;
  VENTRICULAR_TACHYCARDIA:ArrhythmiaParameter;
  IDIOVENTRICULAR_RYTHM:ArrhythmiaParameter;
  SUPRAVENTRICULAR_TACHYCARDIA:ArrhythmiaParameter;
  AFIB_FLUTTER:ArrhythmiaParameter;
  JUNCTIONAL_TACHYCARDIA:ArrhythmiaParameter;
  FIRST_DEGREE_AV_BLOCK:ArrhythmiaParameter;
  SECOND_DEGREE_AV_BLOCK_TYPE_I:ArrhythmiaParameter;
  SECOND_DEGREE_AV_BLOCK_TYPE_II:ArrhythmiaParameter;
  PAUSE:ArrhythmiaParameter;
  V_COUPLET:ArrhythmiaParameter;
  V_BIGEMINY:ArrhythmiaParameter;
  V_TRIGEMINY:ArrhythmiaParameter;
  PVC_RATE:ArrhythmiaParameter;
  PAC_RATE:ArrhythmiaParameter;
  PVC:ArrhythmiaParameter;
  PAC:ArrhythmiaParameter;
}

export interface ArrhythmiaParameter {
  Enabled: boolean;
  Priority: string;
  LowThr: number;
  HighThr: number;
  CondDelay: number;
  HighUnit: string;
  LowUnit: string;
  Thr: number;
}
export interface AlertDestinationConfiguration {
  status: string;
  message: string;
  data: AlertDestinationConfigData;
}

export interface ClinicalFacilityContactList {
  status: string;
  message: string;
  data: ClinicalFacilityContactListData;
}

export interface AlertConfigurationData {
  AlertId: string;
  FacilityId: string;
  FacilityName: string;
  GroupId: string;
  IsForPatient: boolean;
  PatientId: string;
  Setting: Settings;
  auditloginfotype: AuditLogInfoType;
}

export interface AuditLogInfoType {
  CreatedBy: string;
  CreatedById: string;
  ModifiedBy: string;
  ModifiedById: string;
  CreatedDateTime: string;
  ModifiedDateTime: string;
}

export interface Settings {
  Param: ParameterSettings;
  Common: CommonSettings;
}

export interface ParameterSettings {
  PhyParam: PhyParameterSettings;
  TechParam: TechnicalParameterSettings;
}

export interface CommonSettings {
  PhyCommon: PhyCommonSettings;
  TechCommon: TechnicalCommonSettings;
}

export interface PhyParameterSettings {
  HR: PhyParameter;
  RR: PhyParameter;
  PR: PhyParameter;
  SPO2: PhyParameter;
  BPSYS: PhyParameter;
  BPDIA: PhyParameter;
  BP: PhyParameter;
  SKINTEMP: PhyParameter;
  BODYTEMP: PhyParameter;
  CardiacStandStill: PhyParameter;
}

export interface TechnicalParameterSettings {
  LEAD_OFF: TechnicalParameter;
  BIOSENSOR_DISCONNECTED: TechnicalParameter;
  RELAY_DISCONNECTED: TechnicalParameter;
  LOW_BATTERY: TechnicalParameter;
  //TEMPERATURE_CALIBRATION: TechnicalParameter;
  COMPUTE_HR_ERROR: TechnicalParameter;
  COMPUTE_RR_ERROR: TechnicalParameter;
  COMPUTE_SPO2_ERROR: TechnicalParameter;
  COMPUTE_BODY_TEMP_ERROR: TechnicalParameter;
}

export interface PhyCommonSettings {
  HIGH: PhyCommon;
  MEDIUM: PhyCommon;
  LOW: PhyCommon;
}

export interface TechnicalCommonSettings {
  LEAD_OFF: TechnicalCommon;
  BIOSENSOR_DISCONNECTED: TechnicalCommon;
  RELAY_DISCONNECTED: TechnicalCommon;
  LOW_BATTERY: TechnicalCommon;
  //TEMPERATURE_CALIBRATION: TechnicalCommon;
  COMPUTE_HR_ERROR: TechnicalCommon;
  COMPUTE_RR_ERROR: TechnicalCommon;
  COMPUTE_SPO2_ERROR: TechnicalCommon;
  COMPUTE_BODY_TEMP_ERROR: TechnicalCommon;
}

export interface PhyParameter {
  Enabled: boolean;
  Priority: string;
  LowThr: number;
  HighThr: number;
  CondDelay: number;
}

export interface TechnicalParameter {
  Enabled: boolean;
}

export interface PhyCommon {
  Frequency_UnAck: number;
  Frequency_Ack: number;
  Percentage_UnAck: number;
  Percentage_Ack: number;
}

export interface TechnicalCommon {
  CondDelay: number;
  Frequency_UnAck: number;
  Frequency_Ack: number;
}

// Root Alert Destination Settings Model
export interface AlertDestinationConfigData {
  AlertDestId?: string;
  FacilityId?: string;
  GroupId?: string;
  PatientId?: string;
  Setting?: AlertDestSettingType;
  SettingTech?: AlertDestSettingType;
  auditloginfotype?: AuditLogInfoType;
  NotificationMessage?: string;
  UserData;
}

export interface AlertDestSettingType {
  AlertSMS: string;
  AlertWhatsApp: string;
  AlertEmail: string;
  AlertCaregiverApp: string;
  AlertSMSEnabled: boolean;
  AlertWhatsAppEnabled: boolean;
  AlertEmailEnabled: boolean;
  AlertCaregiverAppEnabled: boolean;
}

export interface ClinicalFacilityContactListData
  extends Array<ClinicalFacilityContactListItem> {}

interface ClinicalFacilityContactListItem {
  displayName: string;
  userId: string;
}
