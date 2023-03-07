import { IAppState } from './i-app-state';
import { createReducer, on } from '@ngrx/store';
import { YEARS_API_ACTIONS } from './actions';

export const INITIAL_APP_STATE: IAppState = {
    startingDate: null,
    selectedYear: null,
    artists: []
};

export const YEARS_REDUCER = createReducer(
    INITIAL_APP_STATE,
    on(YEARS_API_ACTIONS.staringYearLoaded, (state, data) => ({ ...state, startingDate: data.startingYear })),
    on(YEARS_API_ACTIONS.artistsLoaded, (state, data) => ({ ...state, artists: [ ...data.artists ] }))
);
