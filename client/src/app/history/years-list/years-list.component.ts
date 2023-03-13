import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistBlockComponent } from '../artist-block/artist-block.component';
import { IAppState, SELECT_CURRENT_YEAR, YEARS_AVAILABLE_SELECTOR } from '../../store';
import { Store } from '@ngrx/store';
import { AvailableYearsSelectorComponent } from '../available-years-selector';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-years-list',
    templateUrl: './years-list.component.html',
    styleUrls: [ './years-list.component.scss' ],
    imports: [
        ArtistBlockComponent,
        CommonModule,
        AvailableYearsSelectorComponent,
        RouterOutlet
    ],
    standalone: true
})
export class YearsListComponent {
    public readonly yearsAvailable$ = this.store.select(YEARS_AVAILABLE_SELECTOR);
    public readonly yearSelected$ = this.store.select(SELECT_CURRENT_YEAR);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }

}
