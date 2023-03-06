import { ChangeDetectionStrategy, Component } from '@angular/core';
import { L10nModule } from '../../l10n';
import { RouterModule } from '@angular/router';
import { ABOUT_ROUTE, YEARS_ROUTE } from '../../routes';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: [ './menu.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [L10nModule, RouterModule]
})
export class MenuComponent {
    public readonly yearsRoute = YEARS_ROUTE;
    public readonly aboutRoute = ABOUT_ROUTE;
}
