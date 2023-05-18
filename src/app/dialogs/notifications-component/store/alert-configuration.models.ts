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

export interface AlertDestinationConfiguration {
  status: string;
  message: string;
  data: AlertDestinationConfigData;
}

export interface AlertConfigurationData {
  AlertId: string;
  FacilityId: string;
  FacilityName: string;
  GroupId: string;
  modifiedDateTime: string;
  IsForPatient: boolean;
  PatientId: string;
  Setting: Settings;
  auditloginfotype: AuditLogInfoType;
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

export interface ClinicalFacilityContactList {
  status: string;
  message: string;
  data: ClinicalFacilityContactListData;
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

//misc

export interface MiscSettings {
  status: string;
  message: string;
  data: MiscellaneousData;
}
export interface MiscellaneousData {
  thirdPartyDeviceSettings: DeviceSettings[];
  ecgFilterSettings: EcgFilterSetting;
  bioSensorConfigSettings: BiosensorSetting[];
  otherSettings: OtherMiscSettings;
  facilityId: string;
  groupId: string;
  patientId: string;
  miscSettingsId: string;
  modifiedDateTime: string;
  alertId: string;
}
export interface EcgFilterSetting {
  ecgFilterSetting: string;
  isActive: boolean;
}
export interface DeviceSettings {
  type: string;
  isActive: boolean;
  defaultDevice: string;
  onTime: number;
  offTime: number;
  dutyCycle: number;
}
export interface BiosensorSetting {
  isActive: boolean;
  ssid1: string;
  ssid2: string;
  password1: string;
  password2: string;
}
export interface OtherMiscSettings {
  autoGeneratePatientId: boolean;
  enableAccessToSPPHY: boolean;
  facilityName: string;
  facilityLogo: string;
  emr: string;
}
export interface AlertHistory {
  status: string;
  message: string;
  data: AlertHistoryData;
}
export interface AlertHistoryData {
  patientId: string;
  topAlerts: alertType[];
}
export interface alertType {
  alertKey: string;
  topN : alert[];
}
export interface alert {
  patientId: string;
  firstName: string;
  lastName: string;
  activePatch: string;
  alertTime: number;
  alertTimeFrom: number;
  alertType: string;
  alertKey: string;
  id: string;
  alertValue: number;
  ewsScore: number;
  ack: boolean;
  active: boolean;
  setting: any[];
}
export interface EventList {
  status: string;
  message: string;
  data: {
    items: EventListData[],
    total: number
  };
}
export interface EventListData {
  alertType: string;
  alertTime: number;
  notes: string;
  ack: boolean;
  notify: boolean;
  acknowledgedBy: string;
  acknowledgedOn: number;
}

