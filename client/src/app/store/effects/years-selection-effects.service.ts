import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../i-app-state';
import { CURRENT_PROFILE_SELECTOR, CURRENT_YEAR_SELECTOR, YEARS_AVAILBALE_SELECTOR } from '../selectors';
import { YEARS_API_ACTIONS } from '../actions';
import { combineLatest, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ApiArtistsListService } from '../../api';

@Injectable()
export class YearsSelectionEffects {
    public readonly availableYearsLoadedEffect = createEffect(() =>
            this.actions$.pipe(
                ofType(YEARS_API_ACTIONS.availableYearsLoaded),
                switchMap(() => combineLatest([
                    this.state.pipe(CURRENT_PROFILE_SELECTOR),
                    this.state.select(YEARS_AVAILBALE_SELECTOR),
                    this.state.pipe(CURRENT_YEAR_SELECTOR)
                ])),
                map(([ profile, years, selectedYear ]) => {
                    console.log(profile, years, selectedYear);
                    if (years.length === 0) {
                        return this.router.navigate([ profile ]);
                    } else if (!selectedYear || !years.includes(selectedYear)) {
                        return this.router.navigate([ profile, years[0] ]);
                    }
                    return Promise.resolve(true);
                })
            ),
        { dispatch: false }
    );

    public readonly profileSelectedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            tap(() => console.log('router navigated')),
            switchMap(() => combineLatest([
                this.state.pipe(CURRENT_YEAR_SELECTOR),
                this.state.pipe(CURRENT_PROFILE_SELECTOR),
                this.state.select(YEARS_AVAILBALE_SELECTOR), // TODO: seems like should not check
            ])),
            filter(([ year, _, availableYears ]) => availableYears.includes(year)),
            distinctUntilChanged(([ prevProfile, prevYear ], [ nextProfile, nextYear ]) => prevProfile === nextProfile && prevYear === nextYear),
            tap(() => {
                this.state.dispatch(YEARS_API_ACTIONS.loadingArtists())
            }),
            switchMap(([ year, profile ]) => fromPromise(this.api.getArtistsList(profile, year))),
            map((response) => YEARS_API_ACTIONS.artistsLoaded({ artists: response })) // TODO: error handling
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly state: Store<IAppState>,
        private readonly router: Router,
        private readonly api: ApiArtistsListService
    ) {
    }
}
