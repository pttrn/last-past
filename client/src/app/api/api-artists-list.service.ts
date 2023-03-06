import { Injectable } from '@angular/core';
import { IArtist } from './i-artist';

@Injectable()
export class ApiArtistsListService {
    public getArtistsList(): Promise<IArtist[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: 'Tiamat', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/b3047c4460a84d85b75965beb6900b2d.jpg' },
                    { name: 'Lake Of Tears', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/94ea03bbea62448cc4dc7a08638aecc7.jpg' },
                    { name: 'Tiamat', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/b3047c4460a84d85b75965beb6900b2d.jpg' },
                    { name: 'Lake Of Tears', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/94ea03bbea62448cc4dc7a08638aecc7.jpg' },
                    { name: 'Tiamat', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/b3047c4460a84d85b75965beb6900b2d.jpg' },
                    { name: 'Lake Of Tears', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/94ea03bbea62448cc4dc7a08638aecc7.jpg' },
                    { name: 'Tiamat', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/b3047c4460a84d85b75965beb6900b2d.jpg' },
                    { name: 'Lake Of Tears', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/94ea03bbea62448cc4dc7a08638aecc7.jpg' },
                    { name: 'Tiamat', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/b3047c4460a84d85b75965beb6900b2d.jpg' },
                    { name: 'Lake Of Tears', imageUrl: 'https://lastfm.freetls.fastly.net/i/u/500x500/94ea03bbea62448cc4dc7a08638aecc7.jpg' },
                ])
            }, Math.random() * 1000 + 200)
        })
    }
}
