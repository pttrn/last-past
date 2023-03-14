import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store';

@Component({
    standalone: true,
    selector: 'app-months-container',
    templateUrl: './months-container.component.html',
    styleUrls: [ './months-container.component.scss' ],
    imports: [
        RouterOutlet
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthsContainerComponent {
    constructor(
        private readonly store: Store<IAppState>
    ) {
    }
}
