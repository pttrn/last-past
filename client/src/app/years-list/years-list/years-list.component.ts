import { Component, OnInit } from '@angular/core';
import { ApiArtistsListService, ApiModule, IArtist } from '../../api';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ArtistBlockComponent } from '../artist-block/artist-block.component';

@Component({
    selector: 'app-years-list',
    templateUrl: './years-list.component.html',
    styleUrls: [ './years-list.component.scss' ],
    imports: [
        NgForOf,
        AsyncPipe,
        ArtistBlockComponent,
        ApiModule
    ],
    standalone: true
})
export class YearsListComponent implements OnInit {
    public list$ = new BehaviorSubject<IArtist[]>([]);

    constructor(
        private readonly listApi: ApiArtistsListService
    ) {
    }

    public ngOnInit(): void {
        this.listApi.getArtistsList().then((r) => this.list$.next(r));
    }
}
