import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../i-app-state';
import { CURRENT_PROFILE_SELECTOR, CURRENT_YEAR_SELECTOR, YEARS_AVAILBALE_SELECTOR } from '../selectors';
import { YEARS_API_ACTIONS } from '../actions';
import { combineLatest, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

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
                        console.log('navigating to profile')
                        return this.router.navigate([ profile ]);
                    } else if (!selectedYear || !years.includes(selectedYear)) {
                        console.log('navigating to first year');
                        return this.router.navigate([ profile, years[0] ]);
                    }
                    return Promise.resolve(true);
                })
            )
        , { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly state: Store<IAppState>,
        private readonly router: Router
    ) {
    }
}
