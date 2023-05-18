import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  ManageUsersState,
  manageUsersFeatureKey,
} from "./manage-users.reducer";

const getUsersState = createFeatureSelector<ManageUsersState>(
  manageUsersFeatureKey
);

export const getUsersList = createSelector(
  getUsersState,
  (state) => state?.USERS_LIST
);

export const getUsersError = createSelector(
  getUsersState,
  (state) => state?.error
);
export const getUsersStatus = createSelector(
  getUsersState,
  (state) => state?.status
);
export const getLoaderStatus = createSelector(
  getUsersState,
  (state) => state?.loaded
);
export const getTableStatus = createSelector(
  getUsersState,
  (state) => state?.tableState
);
export const getUsersCount = createSelector(
  getUsersState,
  (state) => state?.usersCount
);
