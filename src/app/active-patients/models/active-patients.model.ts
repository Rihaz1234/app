import { Group } from "src/app/manage-group/models/manage-groups.model";

export interface UnassignedPatient {
  gender: string;
  patchId : Array<string>;
  biosensorStatus: string;
}

export interface ActivePatient {
  activePatch: string;
  //age: number;
  phoneNo: string;
  email: string;
  name: string;
  biosensorStatus: string;
  archivalStatus: string;
  cgroupId: string;
  cGroup: Group;
  pGroup: Group;
  clinicalInfo: null;
  createdDateTime: string;
  deviceIds: null;
  dob: string;
  doctorId: string;
  firstName: string;
  gender: string;
  height: number;
  heightUnit: string;
  isDischarged: boolean;
  isUnassigned: boolean;
  lastName: string;
  patchIds: Array<PatchId>;
  patientId: string;
  admissionId: string;
  pgroupId: string;
  procedureDuration: number;
  startedOn: number;
  weight: number;
  weightUnit: string;
  estimatedDischarge: number;
}

export interface DOCTORS {
  createdDateTime: string;
  email: string;
  facilityId: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  phoneNo: string;
  roles: Array<string>;
  serviceProviderId: string;
}

export interface NewPatient {
  patientId: string;
  admissionId: string;
  dob: string;
  //age: number;
  phoneNo: string;
  email: string;
  gender: string;
  weight: number;
  height: number;
  weightUnit: string;
  heightUnit: string;
  firstName: string;
  lastName: string;
  doctorId: string;
  cGroup: string;
  pGroup: string;
  patchIds: Array<PatchId>;
  deviceIds: Array<ThirdPartyIds>;
  createdDateTime: Date;
  startedOn: number;
  procedureDuration: number;
  estimatedDischarge: number;
}

export interface AssignGroup {
  patientId: string;
  cGroup: Group;
  pGroup: Group;
}

export interface ThirdPartyIds {
  deviceId: string;
  deviceType: string;
}

export interface PatchId {
  startTime?: Boolean;
  deviceId: string;
}

export enum ClinicalGroup {
  ONCOLOGY = "Oncology",
}

export enum PhysicalGroup {
  REMOTE = "Remote",
  INPATIENT = "Inpatient",
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other"
}

export enum FilterKeysForActivePatient {
  PATIENTID = "MRN",
  PATCHID = "Biosensor ID",
  PATIENTFIRSTNAME = "Patient First Name"
}

export enum FilterKeysForAssignPatient {
  PATCHID = "Biosensor ID",
  // PATIENTNAME = "PATIENTNAME"
}

export enum MonitoringStatus {
  ACTIVE = "ACTIVE",
  STOP = "STOP",
  INPROGRESS = "INPROGRESS",
  STREAMING = "Streaming",
  FINALIZE_IN_PROGRESS = "finalizeInProgress",
  FINALIZED = "finalized"
}

export enum ActivePatientsTabs {
  ASSIGN_PATIENT = "Assign Patient",
  ACTIVE_PATIENT = "Active Patient",
}

export interface TabMetaData {
  name: string;
  pageNumber: number;
  url: string;
  searchString: string;
  sortBy: string;
  size: number;
}

export enum TabMetaDataItems {
  PAGE_NUMBER = 'PAGENUMBER',
  SIZE = 'SIZE',
  SORTBY = 'SORTBY',
  SEARCH_OBJECT = 'SEARCH_OBJECT'
}

export interface AddToDashboard {
  createdBy: string;
  createdById: string;
  createdDateTime: string;
  facilityId: string;
  panelId: string;
  panelType: string;
  patientIds: Array<string>
  patients: Array<{}>
}

export interface PatientData {
  activePatient: ActivePatient;
  patchId: UnassignedPatient
}

export interface Patch {
  deviceId: string;
  deviceType: string;
  endTime: number;
  startTime: number
}

export enum WeightUnits {
  KG = "KG",
  POUND = "POUND"
}

export enum HeightUnits {
  CM = "CM",
  INCH = "INCH"
}
