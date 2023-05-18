export const groupNamePattern = /^[a-zA-Z0-9][a-zA-Z0-9-_ ]*[a-zA-Z0-9]$/
export interface Group {
  Ancestors?: string[];
  type?: string;
  name: string;
  parent?: string;
  groupId?: string;
  facilityId?: string;
  isShow?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  Children?: string[];
  id?: string;
  tempName?: string;
  parentCard?: boolean
}

export interface AssignGroup {
  patientId: string,
  cGroup: GroupObj,
  pGroup: GroupObj
}

export interface GroupObj {
  id: string,
  name: string
}

export enum GroupType {
  CLINICAL = "CLINICAL",
  PHYSICAL = "PHYSICAL"
}

export interface GroupResponse {
  name: string,
  groupId: string,
  FacilityId: string,
  type: GroupType,
  alertId: string,
  alertDestId: string,
  miscSettingsId: string,
  Children: string[],
  parent: string,
  Ancestors: string[],
  AlertIsInherited: boolean,
  isShow?: boolean;
  expanded?: boolean;
  deleted?: boolean;
}
export const restrictedGroupNames = [
   "ROOT",
   "UNASSIGNED",
   "ALL"
]
