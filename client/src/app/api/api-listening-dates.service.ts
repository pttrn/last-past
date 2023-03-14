import { Injectable } from '@angular/core';
import { IPlaybackDates } from './i-playback-dates';

@Injectable()
export class ApiListeningDatesService {
    public getYearsAvailable(profileName: string): Promise<IPlaybackDates> {
        console.log('getting years for', profileName);
        return new Promise<IPlaybackDates>((resolve, reject) => {
            setTimeout(() => {
                const result: IPlaybackDates = {
                    availableYears: []
                };
                const totalYearsCount = Math.round(Math.random() * 10 + 20);
                const nowYear = new Date().getFullYear();
                for (let yearOffset = 0; result.availableYears.length < totalYearsCount; yearOffset++) {
                    if (Math.random() > 2) {
                        continue;
                    }
                    const year: IPlaybackDates['availableYears'][0] = {
                        year: nowYear - yearOffset,
                        days: []
                    };
                    for (let i = 0; i < 365; i++) {
                        if (Math.random() > 0) {
                            year.days.push(i);
                        }
                    }
                    result.availableYears.push(year);
                }
                resolve(result);
            }, Math.random() * 500 + 200);
        });
    }
}
