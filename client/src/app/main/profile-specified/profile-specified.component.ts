import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CURRENT_ROUTE_SELECTOR, IAppState, YEARS_ARE_LOADING_SELECTOR, YEARS_LOADING_ERROR_SELECTOR } from '../../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-profile-specified',
    templateUrl: './profile-specified.component.html',
    styleUrls: [ './profile-specified.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule
    ]
})
export class ProfileSpecifiedComponent {
    public areLoading$ = this.store.select(YEARS_ARE_LOADING_SELECTOR);
    public errorState$ = this.store.select(YEARS_LOADING_ERROR_SELECTOR);

    constructor(
        private readonly store: Store<IAppState>
    ) {
        const p = this.store.select(CURRENT_ROUTE_SELECTOR).subscribe((v: any) => console.log(v));
        console.log(p);
    }
}
