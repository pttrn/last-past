import { Observable, of } from 'rxjs';

export interface IMonth {
    number: number;
    name: Observable<string>;
    isPresent: boolean;
}

export function daysOfYearToMonths(year: number, days: ReadonlyArray<number>): Array<IMonth> {
    const initialDate = new Date();
    initialDate.setFullYear(year, 0, 1);
    const maxDate = new Date(initialDate);
    maxDate.setFullYear(initialDate.getFullYear() + 1);
    const maxDay = (+maxDate - +initialDate) / 1000 / 60 / 60 / 24;

    if (maxDay < Math.max(...days)) {
        return [];
    }

    const allMonths = new Map<number, IMonth>(
        Array.from({ length: 12 }, (_, num) => {
            const p = new Date(0, num);
            return [
                num,
                { number: num, name: of(p.toLocaleString('default', { month: 'short' })), isPresent: false }
            ];
        })
    );

    days.forEach((d) => {
        initialDate.setDate(d);
        const monthData = allMonths.get(initialDate.getMonth());
        if (monthData) {
            monthData.isPresent = true;
        }
    });
    return [ ...allMonths.values() ];
}
