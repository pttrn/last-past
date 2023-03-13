import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArtist, IAvailableYears } from '../api';

export const YEARS_API_ACTIONS = createActionGroup({
    source: 'Years API',
    events: {
        'Loading years': emptyProps(),
        'Available years loaded': props<IAvailableYears>(),
        'Starting year laod error': emptyProps(),
        'Loading artists': emptyProps(),
        'Artists loaded': props<{ artists: IArtist[], profile: string }>()
    }
})

export const YEARS_ACTIONS = createActionGroup({
    source: 'Years page',
    events: {
        'Year selected': props<{ selectedYear: number }>(),
        'Year deselected': emptyProps(),
    }
});
