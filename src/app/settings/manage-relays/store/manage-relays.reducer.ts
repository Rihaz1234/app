import {
  MultiPatientRelay,
  RelayConfiguration,
  SinglePatientRelay,
} from "../../../interfaces/manage-relays.interface";
import { ActionTypes, ManageRelaysActions } from "./manage-relays.actions";

export interface ManageRelaysState {
  SINGLE_PATIENT_RELAYS: SinglePatientRelay[];
  SP_RELAY_COUNT: number;
  MULTI_PATIENT_RELAYS: MultiPatientRelay[];
  MP_RELAY_COUNT: number;
  RELAY_CONFIGURATION: RelayConfiguration;
  CARE_GIVER_RELAYS: SinglePatientRelay[];
  CG_RELAY_COUNT: number;
  error: string;
  loaded: boolean;
}

const initialManageRelayState: ManageRelaysState = {
  SINGLE_PATIENT_RELAYS: [],
  SP_RELAY_COUNT: 0,
  MULTI_PATIENT_RELAYS: [],
  MP_RELAY_COUNT: 0,
  RELAY_CONFIGURATION: {
    sprDeletionDate: {
      isActive: true,
      value: "",
    },
    relayConfigId: "",
  },
  CARE_GIVER_RELAYS: [],
  CG_RELAY_COUNT: 0,
  error: "",
  loaded: false,
};

export const manageRelaysFeatureKey = "managerelays";

export function ManageRelaysReducer(
  state: ManageRelaysState = initialManageRelayState,
  action: ManageRelaysActions
) {
  switch (action.type) {
    case ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ActionTypes.LOAD_SINGLE_PATIENT_RELAYS_SUCCESS: {
      return {
        ...state,
        SINGLE_PATIENT_RELAYS: action.payload.data.data.items,
        SP_RELAY_COUNT: action.payload.data.data.total,
        loaded: true,
      };
    }
    case ActionTypes.LOAD_MULTI_PATIENT_RELAYS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.LOAD_MULTI_PATIENT_RELAYS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ActionTypes.LOAD_MULTI_PATIENT_RELAYS_SUCCESS: {
      return {
        ...state,
        MULTI_PATIENT_RELAYS: action.payload.data.data.items,
        MP_RELAY_COUNT: action.payload.data.data.total,
        loaded: true,
      };
    }
    case ActionTypes.LOAD_RELAY_CONFIGURATION_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.LOAD_RELAY_CONFIGURATION_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ActionTypes.LOAD_RELAY_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        RELAY_CONFIGURATION: action.payload.data.data,
        loaded: true,
      };
    }
    case ActionTypes.LOAD_CARE_GIVER_RELAYS_REQUEST: {
      return {
        ...state,
        error: null,
        loaded: false,
      };
    }

    case ActionTypes.LOAD_CARE_GIVER_RELAYS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case ActionTypes.LOAD_CARE_GIVER_RELAYS_SUCCESS: {
      return {
        ...state,
        CARE_GIVER_RELAYS: action.payload.data.data.items,
        CG_RELAY_COUNT: action.payload.data.data.total,
        loaded: true,
      };
    }
  }
}
