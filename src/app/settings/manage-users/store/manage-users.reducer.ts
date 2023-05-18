import { TableState } from "src/app/life-signals/_models/ls-column.model";
import { CFUser } from "../../../interfaces/manage-users.interface";
import { ActionTypes, ManageUsersActions } from "./manage-users.actions";

export interface ManageUsersState {
  USERS_LIST: CFUser[];
  error: string;
  status: string;
  loaded: boolean;
  tableState: TableState;
  usersCount: number;
}

const initialManageUsersState: ManageUsersState = {
  USERS_LIST: [],
  error: "",
  status: "",
  loaded: false,
  tableState: TableState.DEFAULT,
  usersCount: 0,
};

export const manageUsersFeatureKey = "manageusers";

export function ManageUsersReducer(
  state: ManageUsersState = initialManageUsersState,
  action: ManageUsersActions
) {
  switch (action.type) {
    case ActionTypes.LOAD_ADMIN_USERS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
        tableState: TableState.LOADING
      };
    }

    case ActionTypes.LOAD_ADMIN_USERS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        tableState: TableState.FAILURE
      };
    }

    case ActionTypes.LOAD_ADMIN_USERS_SUCCESS: {
      return {
        ...state,
        USERS_LIST: action.payload.data.data.items,
        loaded: true,
        usersCount: action.payload.data.data.total,
        tableState: TableState.SUCCESS
      };
    }
    case ActionTypes.ADD_USER_REQUEST: {
      return {
        ...state,
        error: null,
        status: null,
        loaded: false,
        tableState: TableState.LOADING
      };
    }

    case ActionTypes.ADD_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loaded: true,
        tableState: TableState.FAILURE
      };
    }

    case ActionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        USERS_LIST: [action.payload.data.data, ...state.USERS_LIST],
        status: action.payload.data.status,
        loaded: true,
        tableState: TableState.SUCCESS
      };
    }
    case ActionTypes.EDIT_USER_REQUEST: {
      return {
        ...state,
        error: null,
        status: null,
        loaded: false,
        tableState: TableState.LOADING
      };
    }

    case ActionTypes.EDIT_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loaded: true,
        tableState: TableState.FAILURE
      };
    }

    case ActionTypes.EDIT_USER_SUCCESS: {
      const updatedlist = state.USERS_LIST.map((user) => {
        return action.payload.data.data.id === user.id
          ? action.payload.data.data
          : user;
      });
      return {
        ...state,
        USERS_LIST: updatedlist,
        status: action.payload.data.status,
        loaded: true,
        tableState: TableState.SUCCESS
      };
    }
  }
}
