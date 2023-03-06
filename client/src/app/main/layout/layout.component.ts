import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from '../menu';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './layout.component.html',
    styleUrls: [ './layout.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MenuComponent,
        RouterOutlet
    ]
})
export class LayoutComponent {
}
