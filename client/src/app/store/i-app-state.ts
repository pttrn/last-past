import { IArtistState } from './i-artist-state';

export interface IAppState {
    startingDate: string | null;
    selectedYear: number | null;
    artists: IArtistState[];
}

