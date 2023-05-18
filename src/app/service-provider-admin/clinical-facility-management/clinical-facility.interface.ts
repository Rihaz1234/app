export interface ClinicalFacility {
  timezone: string;
  id: string;
  isActive: boolean;
  serviceproviderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  name: string;
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  multiFactorAuthEn: boolean;
  dataStorageMode: string;
  createdBy: string;
  createdById: string;
  modifiedBy: string;
  modifiedById: string;
  zipCode: string;
  groupHospital: boolean;
  numberOfBeds: number;
}

export interface ClinicalFacilityResponse {
  status: string;
  message: number;
  data: ClinicalFacility[];
}

export interface AddEditClinicalFacilityResponse {
  status: string;
  message: number;
  data: ClinicalFacility;
}
