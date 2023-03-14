import { Inject, Injectable, InjectionToken } from '@angular/core';
import { RouterPayload } from './index';

export interface IFeatureUrlFromPayloadBuilder<T extends RouterPayload> {
    buildUrl(featurePayload: T): string[] | null;
}

export const FEATURE_URL_FROM_PAYLOAD_BUILDER = new InjectionToken<IFeatureUrlFromPayloadBuilder<RouterPayload>>('FEATURE_URL_FROM_PAYLOAD_BUILDER');

@Injectable()
export class UrlFromPayloadBuilderService {
    constructor(
        @Inject(FEATURE_URL_FROM_PAYLOAD_BUILDER) private readonly urlBuilders: Array<IFeatureUrlFromPayloadBuilder<RouterPayload>>
    ) {
    }
    
    public buildUrl(payload: RouterPayload): string[] {
        for(const builder of this.urlBuilders) {
            const url = builder.buildUrl(payload);
            if (url) {
                return url;
            }
        }

        throw new Error(`unable to find url builder for ${JSON.stringify(payload)}`);
    }
}