import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-available-years-selector',
    templateUrl: './available-years-selector.component.html',
    styleUrls: [ './available-years-selector.component.scss' ],
    imports: [
        CommonModule,
        RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableYearsSelectorComponent {
    @Output() public readonly yearSelect = new EventEmitter<number>();
    @Input() public yearSelected = 0;
    @Input() public yearsAvailable = [];
}
