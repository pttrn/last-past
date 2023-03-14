import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export type RouterPayload = NoFeatureSelected | HistoryFeatureRouterPayload

export type NoFeatureSelected = {
    feature: 'none';
    profile: string;
}

export type HistoryFeatureRouterPayload = {
    profile: string;
    feature: 'history',
    selectedYear: number | null;
    selectedMonth: number | null;
    selectedDay: number | null;
};

type RouterParams = {
    profile?: string;
    feature?: 'history';
    year?: string;
    month?: string;
    day?: string;
}

const ROUTER_SELECTOR = createFeatureSelector<RouterReducerState>('router');

export const ROUTER_PAYLOAD_SELECTOR = createSelector(
    ROUTER_SELECTOR,
    (router): RouterPayload | null => {
        let combinedRouterParams: RouterParams = {};
        const path: string[] = [];
        let current = router?.state?.root;

        while (current?.firstChild) {
            current = current.firstChild;
            if (current.url.length) {
                path.push(...current.url.map((r) => r.path));
            }
            combinedRouterParams = { ...combinedRouterParams, ...current.params };
        }

        if (path.length !== 0) {
            try {
                console.log(extractRouterPayload(path, combinedRouterParams));
                return extractRouterPayload(path, combinedRouterParams);
            } catch (e) {
                console.error(e);
            }
        }

        return null;
    }
)

export const SELECT_CURRENT_ROUTER_FEATURE = createSelector(
    ROUTER_PAYLOAD_SELECTOR,
    (d) => d?.feature
);

function extractRouterPayload(segments: ReadonlyArray<string>, combinedRouterParams: Readonly<RouterParams>): RouterPayload {
    const featurePath = segments[1];
    switch (featurePath) {
        case 'history':
            return extractHistoryFeaturePayload(combinedRouterParams);
        default:
            throw new Error(`unhandled feature ${featurePath}`);
    }
}

function extractHistoryFeaturePayload(params: Readonly<RouterParams>): HistoryFeatureRouterPayload {
    return {
        feature: 'history',
        profile: params['profile'] ?? '',
        selectedYear: params?.year !== undefined ? +params.year : null,
        selectedMonth: params?.month !== undefined ? +params.month : null,
        selectedDay: params?.day !== undefined ? +params.day : null
    }
}
