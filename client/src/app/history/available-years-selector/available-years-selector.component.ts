import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface YearData {
    label: string;
    path: string;
    year: number; // TODO: remove redundancy
}

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
    public readonly parentRoute?: ActivatedRoute | null;
    private _yearSelected: number | null = null;
    private _yearsAvailable: YearData[] = [];

    @Input()
    public set yearSelected(v: number | null) {
        this._yearSelected = v;
    }

    public get yearSelected(): number | null {
        return this._yearSelected;
    }

    @Input()
    public set yearsAvailable(v: number[] | null) {
        const parentPath = this.parentRoute?.snapshot.url.slice(0, -1).map((v) => v.path) ?? [];
        this._yearsAvailable = (v ?? []).map((year) => ({
            label: year.toString(),
            path: [ '.', 'history', year.toString() ].join('/'),
            year
        }));
    }

    public get yearsData(): YearData[] {
        return this._yearsAvailable;
    }

    constructor(
        route: ActivatedRoute
    ) {
        this.parentRoute = route.parent;
    }
}
