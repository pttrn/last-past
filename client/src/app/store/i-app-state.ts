import { IArtistState } from './i-artist-state';
import { RouterState } from '@ngrx/router-store';

export interface IAppState {
    router: RouterState;
    years: {
        yearsLoading: {
            inProgress: boolean;
            error: string | null;
        };
        artistsLoading: {
            inProgress: boolean;
            error: string | null;
        }
        availableYears: number[];
        artists: IArtistState[];
    }
}

