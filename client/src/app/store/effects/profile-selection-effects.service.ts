import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { catchError, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { IAppState } from '../i-app-state';
import { Store } from '@ngrx/store';
import { CURRENT_PROFILE_SELECTOR } from '../selectors';
import { ApiYearsAvailableService } from '../../api/api-years-available.service';
import { YEARS_API_ACTIONS } from '../actions';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class ProfileSelectionEffects {
    public readonly profileSelectedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            switchMap(() => this.state.pipe(CURRENT_PROFILE_SELECTOR)),
            distinctUntilChanged(),
            tap(() => {
                this.state.dispatch(YEARS_API_ACTIONS.loadingYears())
            }),
            switchMap((r) => fromPromise(this.api.getYearsAvailable(r))),
            map((response) => YEARS_API_ACTIONS.availableYearsLoaded({ availableYears: response.availableYears })),
            catchError(() => of(YEARS_API_ACTIONS.startingYearLaodError()))
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly state: Store<IAppState>,
        private readonly api: ApiYearsAvailableService
    ) {
    }
}
