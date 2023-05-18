import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManageGroupState, manageGroupFeatureKey } from "./manage-groups.reducer";

const getGroupsState = createFeatureSelector<ManageGroupState>(manageGroupFeatureKey);

export const selectGroupsList = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState
);
export const groupsLoaded = createSelector(
    getGroupsState,
    (ManageGroupState) => ManageGroupState?.groupsLoaded
);

export const selectGroupsError = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState?.error
);

export const removeGroup = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState
);

export const removeGroupError = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState?.error
);

export const saveGroup = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState
);

export const saveGroupError = createSelector(
  getGroupsState,
  (ManageGroupState) => ManageGroupState?.error
);

