export interface AlertSettings {
  Enabled: boolean;
  Priority: string;
  LowThr: number;
  HighThr: number;
}

export interface PatientAlertSettings {
  HR: AlertSettings;
  RR: AlertSettings;
  PR: AlertSettings;
  SPO2: AlertSettings;
  BP: AlertSettings;
  BPSYS: AlertSettings;
  BPDIA: AlertSettings;
  SKINTEMP: AlertSettings;
  BODYTEMP: AlertSettings;
  EWS: AlertSettings;
  POSTURE_ALERT: AlertSettings;
}

export interface Patient {
  admissionId: string;
  admissionIdList: Array<string>;
  patientId: string;
  dob: Date,
  monitoringTime: string;
  startedOn: number;
  completedOn: number;
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  phoneNo: string;
  patchId?: string;
  doctorId?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  sex?: string;
  created?: Date;
  started?: Date;
  settings?: PatientAlertSettings;
  location?: string;
  cGroup?: { name: string };
  pGroup?: { name: string };
}
