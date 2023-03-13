import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../i-app-state';
import { SELECT_CURRENT_PROFILE, SELECT_CURRENT_ROUTER_FEATURE, SELECT_CURRENT_YEAR, YEARS_AVAILABLE_SELECTOR } from '../selectors';
import { YEARS_API_ACTIONS } from '../actions';
import { combineLatest, distinctUntilChanged, filter, from, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { ApiArtistsListService } from '../../api';
import { HISTORY_ROUTE } from '../../routes';

@Injectable()
export class YearsSelectionEffects {
    public readonly availableYearsLoadedEffect = createEffect(() =>
            this.actions$.pipe(
                ofType(YEARS_API_ACTIONS.availableYearsLoaded),
                switchMap(() => this.state.select(SELECT_CURRENT_ROUTER_FEATURE)),
                filter((f) => !!f),
                switchMap(() => combineLatest([
                    this.state.select(SELECT_CURRENT_PROFILE),
                    this.state.select(YEARS_AVAILABLE_SELECTOR),
                    this.state.select(SELECT_CURRENT_YEAR),
                ])),
                map(([ profile, years, selectedYear ]) => {
                    if (years.length === 0) {
                        return this.router.navigate([ profile, HISTORY_ROUTE ]);
                    } else if (!selectedYear || !years.includes(selectedYear)) {
                        return this.router.navigate([ profile, HISTORY_ROUTE, years[0] ]);
                    }
                    return Promise.resolve(true);
                })
            ),
        { dispatch: false }
    );

    public readonly yearSelectedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            switchMap(() => this.state.select(SELECT_CURRENT_ROUTER_FEATURE)),
            filter((f) => !!f),
            switchMap(() => combineLatest([
                this.state.select(SELECT_CURRENT_YEAR),
                this.state.select(SELECT_CURRENT_PROFILE),
                this.state.select(YEARS_AVAILABLE_SELECTOR),
            ])),
            filter(([ year, profile, availableYears ]) => profile !== null && year !== null && availableYears.includes(year)),
            distinctUntilChanged(([ prevProfile, prevYear ], [ nextProfile, nextYear ]) => prevProfile === nextProfile && prevYear === nextYear),
            tap(() => {
                this.state.dispatch(YEARS_API_ACTIONS.loadingArtists())
            }),
            switchMap(([ year, profile ]) => combineLatest([
                of(profile),
                from(this.api.getArtistsList(profile as string, year as number))
            ])), // cannot be null due to filtering above
            map(([ profile, response ]) => YEARS_API_ACTIONS.artistsLoaded({ artists: response, profile: profile as string })) // TODO: error handling
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
