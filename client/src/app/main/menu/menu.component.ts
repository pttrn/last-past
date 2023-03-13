import { ChangeDetectionStrategy, Component } from '@angular/core';
import { L10nModule } from '../../l10n';
import { Router, RouterModule } from '@angular/router';
import { ABOUT_ROUTE, HISTORY_ROUTE } from '../../routes';
import { ProfileInputComponent } from '../profile-input';
import { AsyncPipe } from '@angular/common';
import { IAppState, SELECT_CURRENT_PROFILE } from '../../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: [ './menu.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ L10nModule, RouterModule, ProfileInputComponent, AsyncPipe ]
})
export class MenuComponent {
    public readonly yearsRoute = HISTORY_ROUTE;
    public readonly aboutRoute = ABOUT_ROUTE;
    public readonly profileName$ = this.store.select(SELECT_CURRENT_PROFILE)

    constructor(
        private router: Router,
        private readonly store: Store<IAppState>
    ) {
    }

    public onProfileNameChange(name: string): void {
        this.router.navigate([ name, HISTORY_ROUTE ]);
    }
}
