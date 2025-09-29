import React from 'react';
import {useSearchParams} from 'react-router-dom';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import TrackCard from '../../components/TrackCard/TrackCard';
import api from '../../api/api';
import './SearchPage.css';

function SearchPage() {
    const [params] = useSearchParams();
    const q = params.get('q') || '';
    const [artists, setArtists] = React.useState<any[]>([]);
    const [albums, setAlbums] = React.useState<any[]>([]);
    const [tracks, setTracks] = React.useState<any[]>([]);

    const runSearch = React.useCallback(async (query: string) => {
        if (!query) return;
        const [a, al, t] = await Promise.all([
            api({ method: 'artist.search', artist: query, limit: 12 }).then(d => d.results?.artistmatches?.artist || []),
            api({ method: 'album.search', album: query, limit: 12 }).then(d => d.results?.albummatches?.album || []),
            api({ method: 'track.search', track: query, limit: 12 }).then(d => d.results?.trackmatches?.track || []),
        ]);
        setArtists(a); setAlbums(al); setTracks(t);
    }, []);

    React.useEffect(() => { runSearch(q); }, [q, runSearch]);

    return (
        <main className="container">
            <section className="section">
                <h2 className="section-title">Artists</h2>
                <div className="artists-grid square" style={{ gridTemplateColumns: 'repeat(4, 240px)' }}>
                    {artists.slice(0, 12).map((a, i) => (
                        <ArtistCard key={i} name={a.name} image={a.image?.[2]?.['#text'] || a.image?.[1]?.['#text']} />
                    ))}
                </div>
            </section>
            <section className="section">
                <h2 className="section-title">Albums</h2>
                <div className="albums-grid">
                    {albums.slice(0, 12).map((al, i) => (
                        <article className="album" key={i}>
                            <img className="cover" src={al.image?.[2]?.['#text'] || al.image?.[1]?.['#text'] || 'https://picsum.photos/seed/album/300'} alt={al.name} />
                            <h3 className="title">{al.name}</h3>
                            <p className="artist">{al.artist}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="section">
                <h2 className="section-title">Tracks</h2>
                <div className="tracks-grid">
                    {tracks.slice(0, 12).map((t, i) => (
                        <TrackCard key={i} name={t.name} artist={t.artist?.name || t.artist} image={t.image?.[1]?.['#text']} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default SearchPage;