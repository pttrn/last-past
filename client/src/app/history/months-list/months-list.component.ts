import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

interface IMonth {
    name: string;
    isSelectable: boolean;
}

@Component({
    standalone: true,
    selector: 'app-months-selector',
    templateUrl: './months-list.component.html',
    styleUrls: [ './months-list.component.scss' ],
    imports: [
        NgForOf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthsListComponent {
    @Input() public year: number | null = null;
    @Input() public days: number[] = [];

    public get months(): Iterable<IMonth> {
        if (this.year === null || this.days.length === 0) {
            return [];
        }

        const initialDate = new Date();
        initialDate.setFullYear(this.year, 0, 1);
        const maxDate = new Date(initialDate);
        maxDate.setFullYear(initialDate.getFullYear() + 1);
        const maxDay = (+maxDate - +initialDate) / 1000 / 60 / 60 / 24;

        if (maxDay < Math.max(...this.days)) {
            return [];
        }

        const allMonths = new Map<number, IMonth>(
            Array.from({ length: 12 }, (_, num) => {
                const p = new Date(0, num);
                return [ num, { name: p.toLocaleString('default', { month: 'short' }), isSelectable: false } ];
            })
        );

        this.days.forEach((d) => {
            initialDate.setDate(d);
            const monthData = allMonths.get(initialDate.getMonth());
            if (monthData) {
                monthData.isSelectable = true;
            }
        });
        return allMonths.values();
    }
}
