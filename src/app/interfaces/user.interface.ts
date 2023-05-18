export interface User {
  designation: any;
  id: string;
  isActive: boolean;
  roles: string[];
  facilityId: string;
  serviceProviderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  createdBy: string;
  createdById: string;
  modifiedBy: string;
  modifiedById: string;
}

export interface UserResponse {
  status: string;
  message: number;
  data: User[];
}

export interface AddEditUserResponse {
  status: string;
  message: number;
  data: User;
}

export enum UserErrors {
  EMAIL_OR_PHONE_ALREADY_EXIST = "EMAIL_OR_PHONE_ALREADY_EXIST",
}
