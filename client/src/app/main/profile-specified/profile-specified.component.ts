import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAppState, YEARS_ARE_LOADING_SELECTOR, YEARS_LOADING_ERROR_SELECTOR } from '../../store';
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
    public areLoading$ = this.store.select(YEARS_ARE_LOADING_SELECTOR);
    public errorState$ = this.store.select(YEARS_LOADING_ERROR_SELECTOR);

    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
