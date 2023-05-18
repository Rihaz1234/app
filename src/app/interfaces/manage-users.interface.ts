export interface CFUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  serviceProviderId: string;
  facilityId: string;
  roles: string[];
  isActive: boolean;
  createdDateTime: string;
  timezone: string;
  units: string;
}
export interface CFUserList {
  message: string;
  status: string;
  data: UserData;
}
export interface UserData {
  items: CFUser[];
  total: number;
}
export interface AddUser {
  message: string;
  status: string;
  data: CFUser;
}
export interface EditUser {
  message: string;
  status: string;
  data: CFUser;
}
export interface QueryParams {
  url: string;
  page: number;
  size: number;
  sortBy: string;
  searchText: string;
}
