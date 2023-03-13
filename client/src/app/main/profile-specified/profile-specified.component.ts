import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAppState, SELECT_ARE_YEARS_LOADING, SELECT_CURRENT_PROFILE, SELECT_YEARS_LOADING_ERROR } from '../../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-profile-specified',
    templateUrl: './profile-specified.component.html',
    styleUrls: [ './profile-specified.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        RouterOutlet
    ]
})
export class ProfileSpecifiedComponent {
    public areLoading$ = this.store.select(SELECT_ARE_YEARS_LOADING);
    public errorState$ = this.store.select(SELECT_YEARS_LOADING_ERROR);
    public profileName$ = this.store.select(SELECT_CURRENT_PROFILE);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
