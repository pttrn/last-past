import { makeEnvironmentProviders } from '@angular/core';
import { FEATURE_URL_FROM_PAYLOAD_BUILDER } from '../store/url-from-payload-builder.service';
import { HistoryUrlBuilderService } from './history-url-builder.service';

export function provideHistoryUrlBuilders() {
    return makeEnvironmentProviders([
        { provide: FEATURE_URL_FROM_PAYLOAD_BUILDER, useClass: HistoryUrlBuilderService, multi: true }
    ]);
}
