import { User } from "../../../interfaces/user.interface";
import {
  ManageAdminActions,
  ManageAdminActionTypes,
} from "./manage-admin.actions";
import {TableState} from "../../../life-signals/_models/ls-column.model";

export interface ManageAdminState {
  ADMIN_DATA: User[];
  error: string;
  save_admin_success: User;
  save_admin_error: any;
  userId: string;
  tableState: string;
}

const initialState: ManageAdminState = {
  ADMIN_DATA: [],
  error: "",
  save_admin_success: null,
  save_admin_error: "",
  userId: "",
  tableState: TableState?.DEFAULT
};

export const manageAdminFeatureKey = "manageadmin";

export function manageAdminReducer(
  state: ManageAdminState = initialState,
  action: ManageAdminActions
) {
  switch (action.type) {
    case ManageAdminActionTypes.LOAD_MANAGE_ADMIN_ACTION:
      return {
        ...state,
        ADMIN_DATA: [],
        tableState: TableState.LOADING
      };

    case ManageAdminActionTypes.LOAD_MANAGE_ADMIN_SUCCESS:
      return {
        ...state,
        ADMIN_DATA: action.payload,
        tableState: TableState.SUCCESS
      };

    case ManageAdminActionTypes.LOAD_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        tableState: TableState.FAILURE
      };

    case ManageAdminActionTypes.SAVE_MANAGE_ADMIN_SUCCESS:
      return {
        ...state,
        save_admin_success: action.payload,
        save_admin_error: "",
        ADMIN_DATA: [...state.ADMIN_DATA, action.payload],
      };

    case ManageAdminActionTypes.AFTER_SAVE_MANAGE_ADMIN_SUCCESS:
      return {
        ...state,
        save_admin_success: null,
        save_admin_error: "",
      };

    case ManageAdminActionTypes.SAVE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        save_admin_error: action.payload,
      };

    case ManageAdminActionTypes.AFTER_SAVE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        save_admin_error: "",
        save_admin_success: null,
      };

    case ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_SUCCESS:
      const updatedAdminData = state.ADMIN_DATA.map((adminData) => {
        return adminData.id === action.payload.id ? action.payload : adminData;
      });

      return {
        ...state,
        save_admin_error: "",
        error: "",
        save_admin_success: action.payload,
        ADMIN_DATA: updatedAdminData,
      };

    case ManageAdminActionTypes.AFTER_UPDATE_MANAGE_ADMIN_SUCCESS:
      return {
        ...state,
        save_admin_success: null,
        save_admin_error: "",
      };

    case ManageAdminActionTypes.UPDATE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        save_admin_error: action.payload,
      };
    case ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN_SUCCESS:
      const updatedDataForInactive = state.ADMIN_DATA.map((adminData) => {
        if (adminData.id === action.payload) {
          adminData.isActive = false;
        }
        return adminData;
      });

      return {
        ...state,
        ADMIN_DATA: updatedDataForInactive,
      };

    case ManageAdminActionTypes.AFTER_UPDATE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        save_admin_error: "",
        save_admin_success: null,
      };
    case ManageAdminActionTypes.INACTIVE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN_SUCCESS:
      const updatedDataForActive = state.ADMIN_DATA.map((adminData) => {
        if (adminData.id === action.payload) {
          adminData.isActive = true;
        }
        return adminData;
      });

      return {
        ...state,
        ADMIN_DATA: updatedDataForActive,
      };
    case ManageAdminActionTypes.ACTIVE_MANAGE_ADMIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
