import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { L10nModule } from '../../l10n';

@Component({
    standalone: true,
    selector: 'app-artist-block',
    templateUrl: './artist-block.component.html',
    styleUrls: [ './artist-block.component.scss' ],
    imports: [
        L10nModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistBlockComponent {
    @Input() public imageUrl = '';
    @Input() public name = '';
}
