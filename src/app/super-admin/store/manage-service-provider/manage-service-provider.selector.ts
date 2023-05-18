import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  serviceProviderFeatureKey,
  ServiceProviderState,
} from "./manage-service-provider.reducer";

const getManageServiceProviderState =
  createFeatureSelector<ServiceProviderState>(serviceProviderFeatureKey);

export const selectManageServiceProviderList = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state
);

export const selectManageServiceProviderError = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state?.error
);

export const addServiceProviderSuccess = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state?.save_service_provider_success
);

export const addServiceProviderFailure = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state?.save_service_provider_error
);

export const updateServiceProviderSuccess = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state?.save_service_provider_success
);

export const updateServiceProviderFailure = createSelector(
  getManageServiceProviderState,
  (state: ServiceProviderState) => state?.save_service_provider_error
);
