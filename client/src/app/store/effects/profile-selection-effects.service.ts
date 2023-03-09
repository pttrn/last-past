import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { IAppState } from '../i-app-state';
import { Store } from '@ngrx/store';
import { CURRENT_ROUTE_SELECTOR } from '../selectors';
import { ApiYearsAvailableService } from '../../api/api-years-available.service';
import { YEARS_API_ACTIONS } from '../actions';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class ProfileSelectionEffects {
    public readonly profileSelectedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            switchMap(() => this.state.select(CURRENT_ROUTE_SELECTOR)),
            tap((r) => console.log(r)),
            map((r) => r.url[0]?.path),
            filter((r) => !!r),
            tap(() => {
                console.log('hi');
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
