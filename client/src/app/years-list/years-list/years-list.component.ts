import { Component, OnInit } from '@angular/core';
import { ApiArtistsListService, ApiModule } from '../../api';
import { CommonModule } from '@angular/common';
import { ArtistBlockComponent } from '../artist-block/artist-block.component';
import { IAppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-years-list',
    templateUrl: './years-list.component.html',
    styleUrls: [ './years-list.component.scss' ],
    imports: [
        ArtistBlockComponent,
        ApiModule,
        CommonModule
    ],
    standalone: true
})
export class YearsListComponent implements OnInit {
    constructor(
        private readonly listApi: ApiArtistsListService,
        private readonly store: Store<IAppState>
    ) {
    }

}
