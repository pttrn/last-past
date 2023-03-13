import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-history-component',
    templateUrl: './history.component.html',
    styleUrls: [ './history.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet
    ],
})
export class HistoryComponent {
}
