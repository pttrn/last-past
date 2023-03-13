import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { catchError, distinctUntilChanged, filter, from, map, of, switchMap, tap } from 'rxjs';
import { IAppState } from '../i-app-state';
import { Store } from '@ngrx/store';
import { SELECT_CURRENT_PROFILE } from '../selectors';
import { ApiListeningDatesService } from '../../api/api-listening-dates.service';
import { YEARS_API_ACTIONS } from '../actions';

@Injectable()
export class ProfileSelectionEffects {
    public readonly profileSelectedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            switchMap(() => this.state.select(SELECT_CURRENT_PROFILE)),
            filter((r) => !!r),
            distinctUntilChanged(),
            tap(() => {
                this.state.dispatch(YEARS_API_ACTIONS.loadingYears())
            }),
            switchMap((r) => from(this.api.getYearsAvailable(r as string))), // r cannot be empty due to filterring above
            map((response) => YEARS_API_ACTIONS.availableYearsLoaded(response)),
            catchError(() => of(YEARS_API_ACTIONS.startingYearLaodError()))
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly state: Store<IAppState>,
        private readonly api: ApiListeningDatesService
    ) {
    }
}
