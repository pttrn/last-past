import { Injectable } from '@angular/core';
import { HistoryFeatureRouterPayload } from '../store';
import { HISTORY_ROUTE } from '../routes';

@Injectable()
export class HistoryUrlBuilderService {
    public buildUrl(featurePayload: HistoryFeatureRouterPayload): string[] {
        const result: string[] = [
            featurePayload.profile,
            HISTORY_ROUTE,
        ];
        if (featurePayload.selectedYear !== null) {
            result.push(featurePayload.selectedYear.toString());
            if (featurePayload.selectedMonth !== null) {
                result.push(featurePayload.selectedMonth.toString());
                if (featurePayload.selectedDay !== null) {
                    result.push(featurePayload.selectedDay.toString());
                }
            }
        }
        return result;
    }
}
