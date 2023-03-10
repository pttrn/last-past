import { Injectable } from '@angular/core';
import { IAvailableYears } from './i-available-years';

@Injectable()
export class ApiYearsAvailableService {
    public getYearsAvailable(profileName: string): Promise<IAvailableYears> {
        console.log('getting years for', profileName);
        return new Promise<IAvailableYears>((resolve, reject) => {
            setTimeout(() => {
                // if (Math.random() > 0.5) {
                const totalYears = Math.round(Math.random() * 20) + 1;
                const result: number[] = Array.from({ length: totalYears }, (_, idx) => 2000 + idx)
                                              .map((v) => Math.random() > 0.7 ? v : null)
                                              .filter((v) => !!v) as number[];
                if (result.length === 0) {
                    result.push(2000);
                }
                resolve({ availableYears: result });
                // } else {
                //     reject(new Error('some weird error'));
                // }

            }, Math.random() * 500 + 200);
        });
    }
}
