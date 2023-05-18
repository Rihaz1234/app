import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  userManagementFeatureKey,
  UserManagementState,
} from "./user-management.reducer";

const getUserManagementState = createFeatureSelector<UserManagementState>(
  userManagementFeatureKey
);

export const selectUserManagementList = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state
);

export const selectUserManagementError = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state?.error
);

export const saveUserManagementSuccess = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state?.save_user_success
);

export const saveUserManagementFailure = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state?.save_user_error
);

export const updateUserManagementSuccess = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state?.save_user_success
);

export const updateUserManagementFailure = createSelector(
  getUserManagementState,
  (state: UserManagementState) => state?.save_user_error
);
