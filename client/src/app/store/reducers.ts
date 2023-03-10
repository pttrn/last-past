import { IAppState } from './i-app-state';
import { createReducer, on } from '@ngrx/store';
import { YEARS_ACTIONS, YEARS_API_ACTIONS } from './actions';
import { RouterState } from '@ngrx/router-store';

export const INITIAL_APP_STATE: IAppState = {
    router: RouterState.Full,
    years: {
        yearsLoading: {
            inProgress: false,
            error: null
        },
        artistsLoading: {
            inProgress: false,
            error: null
        },
        availableYears: [],
        artists: []
    }
};

export const YEARS_REDUCER = createReducer(
    INITIAL_APP_STATE['years'],
    on(YEARS_API_ACTIONS.availableYearsLoaded, (state, data) => ({
        ...state,
        availableYears: [ ...data.availableYears ],
        yearsLoading: { inProgress: false, error: null }
    })),
    on(YEARS_API_ACTIONS.startingYearLaodError, (state) => ({ ...state, startingDate: null, yearsLoading: { inProgress: false, error: 'some error' } })),
    on(YEARS_API_ACTIONS.artistsLoaded, (state, data) => ({ ...state, artists: [ ...data.artists ] })),
    on(YEARS_API_ACTIONS.loadingYears, (state) => ({ ...state, artists: [], selectedYear: null, yearsLoading: { inProgress: true, error: null } })),
    on(YEARS_ACTIONS.yearSelected, (state, data) => ({ ...state, selectedYear: data.selectedYear }))
);
