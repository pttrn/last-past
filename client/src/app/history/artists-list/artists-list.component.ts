import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAppState } from '../../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ArtistBlockComponent } from '../artist-block/artist-block.component';
import { of } from 'rxjs';

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
    public readonly artsts$ = of([]);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
