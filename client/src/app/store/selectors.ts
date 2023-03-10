import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { IAppState } from './i-app-state';
import { distinctUntilChanged, filter, map, pipe } from 'rxjs';

const ROUTER_SELECTOR = createFeatureSelector<RouterReducerState>('router');
export const CURRENT_ROUTE_SELECTOR = createSelector(
    ROUTER_SELECTOR,
    (router) => {
        let result: string[] = [];
        console.log(router);
        let current = router?.state?.root;
        while (current?.firstChild) {
            current = current.firstChild;
            result = current.url.length ? current.url.map((v) => v.path) : result;
        }
        console.log('path:', result);
        return result;
    }
)

export const CURRENT_PROFILE_SELECTOR = pipe(
    select(CURRENT_ROUTE_SELECTOR),
    filter((r) => !!r[0]),
    map((r) => r[0]),
    distinctUntilChanged()
);

export const CURRENT_YEAR_SELECTOR = pipe(
    select(CURRENT_ROUTE_SELECTOR),
    map((r) => +r[1] ?? null),
    distinctUntilChanged()
);

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

export const YEARS_AVAILBALE_SELECTOR = createSelector(
    YEARS_FEATURE_SELECTOR,
    (state) => state.availableYears
);

export const AVAILABLE_ARTISTS_SELECTOR = createSelector(
    YEARS_FEATURE_SELECTOR,
    (state) => state.artists
);
