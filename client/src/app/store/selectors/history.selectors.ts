import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROUTER_PAYLOAD_SELECTOR } from '../router';
import { IAppState } from '../i-app-state';

export const SELECT_CURRENT_PROFILE = createSelector(
    ROUTER_PAYLOAD_SELECTOR,
    (d) => d?.profile ?? null
);

export const SELECT_CURRENT_YEAR = createSelector(
    ROUTER_PAYLOAD_SELECTOR,
    (d) => d?.feature === 'history' ? d.selectedYear : null
);

export const SELECT_YEARS_FEATURE = createFeatureSelector<IAppState['history']>('years');
export const SELECT_YEARS_LOADING_DATA = createSelector(
    SELECT_YEARS_FEATURE,
    (state) => state.yearsLoading
)

export const SELECT_ARE_YEARS_LOADING = createSelector(
    SELECT_YEARS_LOADING_DATA,
    (state) => state.inProgress
);

export const SELECT_YEARS_LOADING_ERROR = createSelector(
    SELECT_YEARS_LOADING_DATA,
    (state) => state.error
);

export const YEARS_AVAILABLE_SELECTOR = createSelector(
    SELECT_YEARS_FEATURE,
    (state) => Object.keys(state.years).map((y) => +y)
);

export const AVAILABLE_ARTISTS_SELECTOR = createSelector(
    SELECT_YEARS_FEATURE,
    (state) => state.years
);
