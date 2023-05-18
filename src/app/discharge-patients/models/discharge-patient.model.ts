export interface DischargePatient {
  activePatch: string;
  age: number;
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
  patchIds: Array<string>;
  patientId: string;
  admissionId: string;
  pgroupId: string;
  procedureDuration: number;
  startedOn: number;
  weight: number;
  weightUnit: string;
}

type Group = {
  id: string;
  name: string;
};
