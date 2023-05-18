export interface SPRelayList {
  status: string;
  message: string;
  data: {
    items: SinglePatientRelay[];
    total: number;
  };
}
export interface MPRelayList {
  status: string;
  message: string;
  data: {
    items: MultiPatientRelay[];
    total: number;
  };
}
export interface UpdateRelay {
  status: string;
  message: string;
  data: any;
}
export interface SinglePatientRelay {
  relayId: string;
  BiosensorID: string;
  createdBy: string;
  email: string;
  phoneNo: string;
  createdDateTime: string;
  lastActive: string;
  relayType: string;
  expiryDate: string;
}
export interface MultiPatientRelay {
  relayId: string;
  location: string;
  createdBy: string;
  createdDateTime: number;
  status: string;
  lastActive: number;
}
export interface RelayConfiguration {
  sprDeletionDate: {
    isActive: boolean;
    value: string;
  };
  relayConfigId: string;
}
export interface RelayConfigurationResponse {
  status: string;
  message: string;
  data: RelayConfiguration;
}
