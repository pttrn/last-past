import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { YEARS_ACTIONS, YEARS_API_ACTIONS } from '../actions';
import { map, switchMap } from 'rxjs';
import { YEARS_AVAILBALE_SELECTOR } from '../selectors';
import { Store } from '@ngrx/store';
import { IAppState } from '../i-app-state';

@Injectable()
export class YearsSelectionEffects {
    public readonly availableYearsLoadedEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(YEARS_API_ACTIONS.availableYearsLoaded),
            switchMap(() => this.state.select(YEARS_AVAILBALE_SELECTOR)),
            map((years) => YEARS_ACTIONS.yearSelected({ selectedYear: years[0] }))
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly state: Store<IAppState>,
    ) {
    }
}
