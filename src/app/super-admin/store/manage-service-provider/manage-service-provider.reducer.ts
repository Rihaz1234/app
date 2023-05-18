import { ServiceProvider } from "../../manage-service-provider/service-provider.interface";
import {
  ManageSpActionTypes,
  ServiceProviderActions,
} from "./manage-service-provider.actions";
import {TableState} from "../../../life-signals/_models/ls-column.model";
import {ActionTypes} from "../../../active-patients/store/active-patients.actions";

export interface ServiceProviderState {
  SERVICE_PROVIDER_DATA: ServiceProvider[];
  error: string;
  save_service_provider_success: ServiceProvider;
  save_service_provider_error: any;
  tableState?: string;
}

const initialState: ServiceProviderState = {
  SERVICE_PROVIDER_DATA: [],
  error: "",
  save_service_provider_success: null,
  save_service_provider_error: "",
  tableState: TableState.DEFAULT
};

export const serviceProviderFeatureKey = "serviceprovider";

export function serviceProviderReducer(
  state: ServiceProviderState = initialState,
  action: ServiceProviderActions
) {
  switch (action.type) {
    case ManageSpActionTypes.LOAD_SERVICE_PROVIDER_ACTION: {
      return {
        ...state,
        error: null,
        tableState: TableState.LOADING,
      };
    }
    case ManageSpActionTypes.LOAD_SERVICE_PROVIDER_SUCCESS:
      return {
        ...state,
        tableState: TableState.SUCCESS,
        SERVICE_PROVIDER_DATA: action.payload,
      };

    case ManageSpActionTypes.LOAD_SERVICE_PROVIDER_FAILURE:
      return {
        ...state,
        tableState: TableState.FAILURE,
        error: action.payload,
      };
    case ManageSpActionTypes.SAVE_SERVICE_PROVIDER_ACTION:
      return {
        ...state,
        save_service_provider_success: null,
      };
    case ManageSpActionTypes.SAVE_SERVICE_PROVIDER_SUCCESS:
      return {
        ...state,
        save_service_provider_success: action.payload,
        save_service_provider_error: "",
        SERVICE_PROVIDER_DATA: [
          ...state?.SERVICE_PROVIDER_DATA,
          action.payload,
        ],
      };

    case ManageSpActionTypes.AFTER_SAVE_SERVICE_PROVIDER_SUCCESS: {
      return {
        ...state,
        save_service_provider_success: null,
        save_service_provider_error: "",
      };
    }

    case ManageSpActionTypes.SAVE_SERVICE_PROVIDER_FAILURE:
      return {
        ...state,
        save_service_provider_error: action.payload,
      };

    case ManageSpActionTypes.AFTER_SAVE_SERVICE_PROVIDER_FAILURE:
      return {
        ...state,
        save_service_provider_error: "",
        save_service_provider_success: null,
      };

    case ManageSpActionTypes.UPDATE_SERVICE_PROVIDER_SUCCESS:
      const updatedSpData = state?.SERVICE_PROVIDER_DATA.map((spData) => {
        return spData.id === action.payload.id ? action.payload : spData;
      });

      return {
        ...state,
        save_service_provider_error: "",
        error: "",
        save_service_provider_success: action.payload,
        SERVICE_PROVIDER_DATA: updatedSpData,
      };

    case ManageSpActionTypes.AFTER_UPDATE_SERVICE_PROVIDER_SUCCESS:
      return {
        ...state,
        save_service_provider_success: null,
        save_service_provider_error: "",
      };

    case ManageSpActionTypes.UPDATE_SERVICE_PROVIDER_FAILURE:
      return {
        ...state,
        save_service_provider_error: action.payload,
      };

    case ManageSpActionTypes.AFTER_UPDATE_SERVICE_PROVIDER_FAILURE:
      return {
        ...state,
        save_service_provider_error: "",
        save_service_provider_success: null,
      };

    default:
      return {
        ...state,
      };
  }
}
