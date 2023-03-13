import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AVAILABLE_ARTISTS_SELECTOR, IAppState } from '../../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ArtistBlockComponent } from '../artist-block/artist-block.component';

@Component({
    standalone: true,
    selector: 'app-artist-list',
    templateUrl: './artists-list.component.html',
    styleUrls: [ './artists-list.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ArtistBlockComponent
    ]
})
export class ArtistsListComponent {
    public readonly artsts$ = this.store.select(AVAILABLE_ARTISTS_SELECTOR);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
