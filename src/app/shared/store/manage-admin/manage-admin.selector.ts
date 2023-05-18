import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  manageAdminFeatureKey,
  ManageAdminState,
} from "./manage-admin.reducer";
import { User } from "../../../interfaces/user.interface";

const getManageAdminState = createFeatureSelector<ManageAdminState>(
  manageAdminFeatureKey
);
export const selectAdminList = (state: ManageAdminState) => state.ADMIN_DATA;

export const selectManageAdminList = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state
);

export const selectManageAdminListError = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state?.error
);

export const addManageAdminSuccess = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state?.save_admin_success
);

export const addManageAdminFailure = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state?.save_admin_error
);

export const updateManageAdminSuccess = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state?.save_admin_success
);

export const updateManageAdminFailure = createSelector(
  getManageAdminState,
  (state: ManageAdminState) => state.save_admin_error
);

export const selectActiveAdmins = createSelector(
  getManageAdminState,
  (state: ManageAdminState) =>
    state?.ADMIN_DATA.filter((c) => c.isActive === true).length
);
