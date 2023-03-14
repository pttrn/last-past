import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROUTER_PAYLOAD_SELECTOR } from './router.selectors';
import { IAppState } from '../i-app-state';
import { daysOfYearToMonths, IMonth } from '../../helpers';

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

export const SELECT_ALL_AVAILABLE_YEARS_WITH_DATA = createSelector(
    SELECT_YEARS_FEATURE,
    (state) => state.years
);

export const YEARS_AVAILABLE_SELECTOR = createSelector(
    SELECT_ALL_AVAILABLE_YEARS_WITH_DATA,
    (state) => Object.keys(state).map((y) => +y)
);

export const SELECT_MONTS_OF_SELECTED_YEAR = createSelector(
    SELECT_CURRENT_YEAR,
    SELECT_ALL_AVAILABLE_YEARS_WITH_DATA,
    (currentYear, yearsData): Array<IMonth> => {
        if (currentYear === null || !yearsData[currentYear]) {
            return [];
        }
        return daysOfYearToMonths(currentYear, yearsData[currentYear].days);
    }
)

export const SELECT_DEFAULT_LISTENING_DATE = createSelector(
    SELECT_ALL_AVAILABLE_YEARS_WITH_DATA,
    (yearsData): { year: number, month: number } | null => {
        const matchingYear = Object.entries(yearsData).find(([ , data ]) => data.days.length !== 0);
        if (matchingYear) {
            const matchingMonth = daysOfYearToMonths(+matchingYear[0], matchingYear[1].days).find((m) => !!m);
            if (matchingMonth) {
                return { year: +matchingYear[0], month: matchingMonth.number };
            }
        }
        return null;
    }
)

export const AVAILABLE_ARTISTS_SELECTOR = createSelector(
    SELECT_YEARS_FEATURE,
    (state) => state.years
);
