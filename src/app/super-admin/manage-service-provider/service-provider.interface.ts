export interface ServiceProvider {
  id: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  createdBy: string;
  createdById: string;
  modifiedBy: string;
  modifiedById: string;
}

export interface ServiceProviderResponse {
  status: string;
  message: number;
  data: ServiceProvider[];
}

export interface AddEditServiceProviderResponse {
  status: string;
  message: number;
  data: ServiceProvider;
}
