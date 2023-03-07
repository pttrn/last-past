import { Injectable } from '@angular/core';
import { IStartingDate } from './i-starting-date';

@Injectable()
export class ApiYearsAvailableService {
    public getYearsAvailable(): Promise<IStartingDate> {
        return new Promise<IStartingDate>((resolve) => {
            setTimeout(() => {
                resolve({ startingDate: '2008-03-07T13:36:52.539Z' });
            }, Math.random() * 500 + 200);
        });
    }
}
