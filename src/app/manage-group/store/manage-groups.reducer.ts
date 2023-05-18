import { Group, GroupResponse, GroupType } from "../models/manage-groups.model";
import { ActionTypes, GroupsActions } from "./manage-groups.actions";

export const manageGroupFeatureKey = "manageGroups";

export interface ManageGroupState {
  CLINICAL_GROUPS: GroupResponse[];
  PHYSICAL_GROUPS: GroupResponse[];
  error: string;
  groupsLoaded: boolean;
}

const initialGroupState: ManageGroupState = {
  CLINICAL_GROUPS: [],
  PHYSICAL_GROUPS: [],
  error: "",
  groupsLoaded: false
};

export function GroupsReducer(
  state: ManageGroupState,
  action: GroupsActions
) {
  state = state || initialGroupState;
  switch (action.type) {
    case ActionTypes.UPDATE_GROUP_REQUEST: {
      return {
        ...state,
        error: null,
        groupsLoaded: false
      }
    }
    case ActionTypes.SAVE_GROUP_REQUEST: {
      return{
        ...state,
        groupsLoaded: false,
        error : null
      }
    }
    case ActionTypes.LOAD_GROUPS_REQUEST: {
      return {
        ...state,
        error: null,
        groupsLoaded: false,
      };
    }
    case ActionTypes.REMOVE_GROUP_REQUEST:{
      return{
        ...state,
        error: null
      };
    }
    case ActionTypes.UPDATE_GROUP_FAILURE: {
      return {
        ...state,
        error : action.payload,
        groupsLoaded: true
      }
    }
    case ActionTypes.SAVE_GROUP_FAILURE: {
      console.log(action.payload)
      return {
        ...state,
        error : action.payload,
        groupsLoaded: true
      }
    }
    case ActionTypes.LOAD_GROUPS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        groupsLoaded: true
      };
    }
    case ActionTypes.REMOVE_GROUP_FAILURE: {
      return{
        ...state,
        error : action.payload
      }
    }
    case ActionTypes.LOAD_GROUPS_SUCCESS: {
      return {
        ...state,
        CLINICAL_GROUPS: setGroups(action.payload).cgroup,
        PHYSICAL_GROUPS: setGroups(action.payload).pgroup,
        groupsLoaded: true
      };
    }

    case ActionTypes.SAVE_GROUP_SUCCESS: {
      let newGroupResponse = setGroup(action.payload['group']['data']);
      let tempCgroup: Group[] = [...state.CLINICAL_GROUPS];
      let tempPgroup: Group[] = [...state.PHYSICAL_GROUPS];
      if (newGroupResponse.type === GroupType.CLINICAL) {
        tempCgroup = [...tempCgroup, <GroupResponse>newGroupResponse];
      } else if (newGroupResponse.type === GroupType.PHYSICAL) {
        tempPgroup.map((g)=>{
          if(g.groupId === newGroupResponse.parent){
            g.Children.push(newGroupResponse.groupId);
            g.hasChildren = true;
            g.expanded = true;
          }
        })
        tempPgroup = [...tempPgroup, <GroupResponse>newGroupResponse];
      }
      return {
        ...state,
        CLINICAL_GROUPS: [...tempCgroup],
        PHYSICAL_GROUPS: [...tempPgroup],
        groupsLoaded: true
      };
    }

    case ActionTypes.UPDATE_GROUP_SUCCESS: {
      let newGroupResponse = setGroup(action.payload['group']['data']);
      let tempCgroup: Group[] = [...state.CLINICAL_GROUPS];
      let tempPgroup: Group[] = [...state.PHYSICAL_GROUPS];
      if (newGroupResponse.type === GroupType.CLINICAL) {
        tempCgroup = [...tempCgroup.map(t => {
          return {
            ...t,
            name: t.groupId === newGroupResponse.groupId ? newGroupResponse?.name : t.name
          }
        })];
      } else if (newGroupResponse.type === GroupType.PHYSICAL) {
        tempPgroup = [...tempPgroup.map(t => {
          return {
            ...t,
            name: t.groupId === newGroupResponse.groupId ? newGroupResponse?.name : t.name
          }
        })];
      }
      return {
        ...state,
        CLINICAL_GROUPS: [...tempCgroup],
        PHYSICAL_GROUPS: [...tempPgroup],
        groupsLoaded: true
      };
    }
    case ActionTypes.REMOVE_GROUP_SUCCESS:{
      return {
        ...state,
      }
    }
  }
}

function setGroup(group) {
  let obj: Group = {
    type: group.type,
    name: group.name,
    parent: group.parent,
    groupId: group.groupId,
    facilityId: group.facilityId,
    Children: group.Children
  };
  return obj;
}

function setGroups(payload: { groups: GroupResponse[] }) {
  let pGroup = new Array();
  let cGroup = new Array();

  payload["groups"].map(group => {
    let obj: Group = {
      type: group.type,
      name: group.name,
      parent: group.parent,
      groupId: group.groupId,
      facilityId: group.FacilityId,
      hasChildren: !!group.Children?.length,
      Children: group.Children
    }
    if (obj.type === GroupType.CLINICAL) {
      cGroup.push(obj);
    } else if (obj.type === GroupType.PHYSICAL) {
      pGroup.push(obj);
    }
  });
  return { cgroup: cGroup, pgroup: pGroup };
}
