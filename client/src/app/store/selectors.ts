import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './i-app-state';

export const CURRENT_ROUTE_SELECTOR = getRouterSelectors().selectCurrentRoute;

export const YEARS_FEATURE_SELECTOR = createFeatureSelector<IAppState['years']>('years');

export const YEARS_LOADING_SELECTOR = createSelector(
    YEARS_FEATURE_SELECTOR,
    (state) => state.yearsLoading
)

export const YEARS_ARE_LOADING_SELECTOR = createSelector(
    YEARS_LOADING_SELECTOR,
    (state) => state.inProgress
);

export const YEARS_LOADING_ERROR_SELECTOR = createSelector(
    YEARS_LOADING_SELECTOR,
    (state) => state.error
);

export const YEARS_SELECTED_YEAR_SELECTOR = createSelector(
    YEARS_FEATURE_SELECTOR,
    (state) => state.selectedYear
);

export const YEARS_AVAILBALE_SELECTOR = createSelector(
    YEARS_FEATURE_SELECTOR,
    (state) => state.availableYears
);

export const PROFILE_NAME_SELECTOR = createSelector(
    CURRENT_ROUTE_SELECTOR,
    (d) => d?.url[0]?.path ?? ''
);
