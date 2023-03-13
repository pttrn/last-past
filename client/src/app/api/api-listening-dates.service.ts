import { Injectable } from '@angular/core';
import { IAvailableYears } from './i-available-years';

@Injectable()
export class ApiListeningDatesService {
    public getYearsAvailable(profileName: string): Promise<IAvailableYears> {
        console.log('getting years for', profileName);
        return new Promise<IAvailableYears>((resolve, reject) => {
            setTimeout(() => {
                const result: IAvailableYears = {
                    availableYears: []
                };
                const totalYearsCount = Math.round(Math.random() * 10 + 2);
                const nowYear = new Date().getFullYear();
                for (let yearOffset = 0; result.availableYears.length < totalYearsCount; yearOffset++) {
                    if (Math.random() > 0.5) {
                        continue;
                    }
                    const year: IAvailableYears['availableYears'][0] = {
                        year: nowYear - yearOffset,
                        months: []
                    };
                    const months = Math.round(Math.random() * 11 + 1);
                    for (let month = 0; year.months.length < months; month++) {
                        if (Math.random() > 0.5) {
                            continue;
                        }
                        const monthData: IAvailableYears['availableYears'][0]['months'][0] = {
                            month,
                            days: []
                        };
                        const days = Math.round(Math.random() * 29) + 1;
                        for (let day = 0; monthData.days.length < days; day++) {
                            if (Math.random() > 0.5) {
                                continue;
                            }
                            monthData.days.push(day);
                        }
                        year.months.push(monthData);
                    }
                    result.availableYears.push(year);
                }
                resolve(result);
            }, Math.random() * 500 + 200);
        });
    }
}
