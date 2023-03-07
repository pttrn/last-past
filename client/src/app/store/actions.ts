import { createActionGroup, props } from '@ngrx/store';
import { IArtist } from '../api';

export const YEARS_API_ACTIONS = createActionGroup({
    source: 'Years API',
    events: {
        'Staring year loaded': props<{ startingYear: string }>(),
        'Artists loaded': props<{ artists: IArtist[] }>()
    }
})

export const YEARS_ACTIONS = createActionGroup({
    source: 'Years page',
    events: {
        'Year selected': props<{ selectedYear: string }>()
    }
});
