import { RouterState } from '@ngrx/router-store';

export interface IAppState {
    router: RouterState;
    history: {
        yearsLoading: {
            inProgress: boolean;
            error: string | null;
        };
        artistsLoading: {
            inProgress: boolean;
            error: string | null;
        }
        years: {
            [year in number]: {
                days: number[]
            }
        },
        topArtistsInTimeSpan: null;
        orderdTracksInTimeSpan: null;
        topTrackInTimeSpan: null;
    }
}
