import {User} from "../../../interfaces/user.interface";
import {UserManagementActions, UserManagementActionTypes,} from "./user-management.actions";
import {TableState} from "../../../life-signals/_models/ls-column.model";

export interface UserManagementState {
  USER_MANAGEMENT_DATA: User[];
  error: string;
  save_user_success: User;
  save_user_error: any;
  tableState: string;
}

const initialState: UserManagementState = {
  USER_MANAGEMENT_DATA: [],
  error: "",
  save_user_success: null,
  save_user_error: "",
  tableState: TableState.DEFAULT
};

export const userManagementFeatureKey = "usermanagement";

export function userManagementReducer(
  state: UserManagementState = initialState,
  action: UserManagementActions
) {
  switch (action.type) {
    case UserManagementActionTypes.LOAD_USER_MANAGEMENT_ACTION:
      return {
        ...state,
        tableState: TableState.LOADING
      };
    case UserManagementActionTypes.LOAD_USER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        USER_MANAGEMENT_DATA: action.payload,
        tableState: TableState.SUCCESS
      };

    case UserManagementActionTypes.LOAD_USER_MANAGEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        tableState: TableState.FAILURE
      };

    case UserManagementActionTypes.SAVE_USER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        save_user_success: action.payload,
        save_user_error: "",
        USER_MANAGEMENT_DATA: [...state?.USER_MANAGEMENT_DATA, action.payload],
      };

    case UserManagementActionTypes.AFTER_SAVE_USER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        save_user_success: null,
        save_user_error: "",
      };

    case UserManagementActionTypes.SAVE_USER_MANAGEMENT_FAILURE:
      return {
        ...state,
        save_user_error: action.payload,
      };

    case UserManagementActionTypes.AFTER_SAVE_USER_MANAGEMENT_FAILURE:
      return {
        ...state,
        save_user_success: null,
        save_user_error: "",
      };

    case UserManagementActionTypes.UPDATE_USER_MANAGEMENT_SUCCESS:
      const updatedUserManagementData = state?.USER_MANAGEMENT_DATA.map(
        (userManagementData) => {
          return userManagementData.id === action.payload.id
            ? action.payload
            : userManagementData;
        }
      );

      return {
        ...state,
        save_user_error: "",
        error: "",
        save_user_success: action.payload,
        USER_MANAGEMENT_DATA: updatedUserManagementData,
      };

    case UserManagementActionTypes.AFTER_UPDATE_USER_MANAGEMENT_SUCCESS:
      return {
        ...state,
        save_user_success: null,
        save_user_error: "",
      };

    case UserManagementActionTypes.UPDATE_USER_MANAGEMENT_FAILURE:
      return {
        ...state,
        save_user_error: action.payload,
      };

    case UserManagementActionTypes.AFTER_UPDATE_USER_MANAGEMENT_FAILURE:
      return {
        ...state,
        save_user_success: null,
        save_user_error: "",
      };

    case UserManagementActionTypes.DISABLE_USER_SUCCESS:
      const updatedDataForDisable = state.USER_MANAGEMENT_DATA.map(
        (userData) => {
          console.log("action: " + action.payload);
          console.log("userData: " + userData.id);
          if (userData.id === action.payload) {
            console.log("in");
            userData.isActive = false;
          }
          return userData;
        }
      );

      return {
        ...state,
        USER_MANAGEMENT_DATA: updatedDataForDisable,
      };
    case UserManagementActionTypes.DISABLE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserManagementActionTypes.ENABLE_USER_SUCCESS:
      const updatedDataForEnable = state.USER_MANAGEMENT_DATA.map(
        (userData) => {
          if (userData.id === action.payload) {
            userData.isActive = true;
          }
          return userData;
        }
      );

      return {
        ...state,
        USER_MANAGEMENT_DATA: updatedDataForEnable,
      };
    case UserManagementActionTypes.ENABLE_USER_FAILURE:
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
