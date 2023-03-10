import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArtist } from '../api';

export const YEARS_API_ACTIONS = createActionGroup({
    source: 'Years API',
    events: {
        'Loading years': emptyProps(),
        'Available years loaded': props<{ availableYears: number[] }>(),
        'Starting year laod error': emptyProps(),
        'Loading artists': emptyProps(),
        'Artists loaded': props<{ artists: IArtist[] }>()
    }
})

export const YEARS_ACTIONS = createActionGroup({
    source: 'Years page',
    events: {
        'Year selected': props<{ selectedYear: number }>(),
        'Year deselected': emptyProps(),
    }
});
