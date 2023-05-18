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
  miscSettingsId: number;
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
  interval: number;
}
export interface BiosensorSetting {
  isActive: boolean;
  relayPassword: string;
  hospitalSSID: string;
  hospitalPassword: string;
}
export interface OtherMiscSettings {
  autoGeneratePatientId: boolean;
  enableAccessToSPPHY: boolean;
  facilityName: string;
  facilityLogo: string;
  emr: string;
}

export interface spo2ConfigData {
  status: string;
  message: string;
  data: spo2Data;
}
export interface spo2Data {
  Spo2ConfigId: string,
  Setting: spo2Setting,
  FacilityId: string,
  FacilityName: string,
  PatientId: string,
  GroupId: string,
  IsForPatient: false,
  modifiedBy: string,
  modifiedById: string,
  modifiedDateTime:string,
}

export interface spo2Setting{
  Enable: boolean,
  Mode: string,
  OnTime: number,
  OffTime: number ,
  DutyCycle : number
}
