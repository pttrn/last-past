import { ChangeDetectionStrategy, Component } from '@angular/core';
import { L10nModule } from '../../l10n';
import { Router, RouterModule } from '@angular/router';
import { ABOUT_ROUTE, HISTORY_ROUTE } from '../../routes';
import { ProfileInputComponent } from '../profile-input';
import { AsyncPipe } from '@angular/common';
import { IAppState, ROUTER_PAYLOAD_SELECTOR, RouterPayload, SELECT_CURRENT_PROFILE } from '../../store';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { UrlFromPayloadBuilderService } from '../../store/url-from-payload-builder.service';

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
        private readonly store: Store<IAppState>,
        private urbBuilder: UrlFromPayloadBuilderService
    ) {
    }

    public onProfileNameChange(name: string): void {
        this.store.select(ROUTER_PAYLOAD_SELECTOR).pipe(
            take(1),
            filter((r) => !!r),
            map((r) => ({ ...r, profile: name })),
            map((r) => this.urbBuilder.buildUrl(r as RouterPayload))
        ).subscribe((v) => this.router.navigate(v));
    }
}
