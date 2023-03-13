import { RouterState } from '@ngrx/router-store';
import { IArtistState } from './i-artist-state';

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
                months: {
                    [month in number]: {
                        days: {
                            [day in number]: IArtistState | 'not loaded yet'
                        }
                    }
                }
            }
        }
    }
}

