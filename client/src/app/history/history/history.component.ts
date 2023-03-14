import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IAppState, SELECT_CURRENT_YEAR, SELECT_MONTS_OF_SELECTED_YEAR, YEARS_AVAILABLE_SELECTOR } from '../../store';
import { Store } from '@ngrx/store';
import { AvailableYearsSelectorComponent } from '../available-years-selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { MonthsListComponent } from '../months-list';

@Component({
    standalone: true,
    selector: 'app-history-component',
    templateUrl: './history.component.html',
    styleUrls: [ './history.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        AvailableYearsSelectorComponent,
        AsyncPipe,
        MonthsListComponent,
        NgIf
    ],
})
export class HistoryComponent {
    public readonly yearsAvailable$ = this.store.select(YEARS_AVAILABLE_SELECTOR);
    public readonly yearSelected$ = this.store.select(SELECT_CURRENT_YEAR);
    public readonly months$ = this.store.select(SELECT_MONTS_OF_SELECTED_YEAR);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
