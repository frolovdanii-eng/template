import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';

const API_KEY = (window as any).LASTFM_API_KEY || 'd858d8a86db7242eb0919f0b3ff516e1';
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';

async function api(params: Record<string, string | number>) {
    const url = new URL(API_ROOT);
    url.search = new URLSearchParams({ format: 'json', api_key: API_KEY, ...params }).toString();
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Network ' + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.message);
    return data;
}

function Header() {
    const navigate = useNavigate();
    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const form = ev.currentTarget;
        const input = form.querySelector('input[type="search"]') as HTMLInputElement | null;
        const q = (input?.value || '').trim();
        navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    }
    return (
        <header className="site-header">
            <div className="container">
                <Link to="/" className="title" style={{ textDecoration: 'none', color: 'inherit' }}>Music</Link>
                <form className="search" onSubmit={onSubmit}>
                    <input type="search" placeholder="Поиск исполнителей и треков" aria-label="Поиск" />
                    <button type="submit">Найти</button>
                </form>
            </div>
        </header>
    );
}

function ArtistCard({ name, image }: { name: string; image?: string }) {
    return (
        <article className="artist">
            <img src={image || 'https://picsum.photos/seed/artist/220'} alt={name} />
            <h3 className="artist-name">{name}</h3>
            <p className="meta">artist</p>
        </article>
    );
}

function TrackCard({ name, artist, image }: { name: string; artist?: string; image?: string }) {
    return (
        <article className="track">
            <img className="cover" src={image || 'https://picsum.photos/seed/track/64'} alt={name} />
            <div className="track-info">
                <h3 className="track-title">{name}</h3>
                <p className="meta">{artist}</p>
            </div>
        </article>
    );
}

function HomePage() {
    const [artists, setArtists] = React.useState<any[]>([]);
    const [tracks, setTracks] = React.useState<any[]>([]);
    React.useEffect(() => {
        (async () => {
            try {
                const [a, t] = await Promise.all([
                    api({ method: 'chart.getTopArtists', limit: 12 }).then(d => d.artists?.artist || []),
                    api({ method: 'chart.getTopTracks', limit: 12 }).then(d => d.tracks?.track || []),
                ]);
                setArtists(a);
                setTracks(t);
            } catch (e) { console.error(e); }
        })();
    }, []);
    return (
        <>
            <main className="container">
                <section className="section">
                    <h2 className="section-title">Hot right now</h2>
                    <div className="artists-grid" style={{ gridTemplateColumns: 'repeat(4, 240px)' }}>
                        {artists.slice(0, 12).map((a, i) => (
                            <ArtistCard key={i} name={a.name} image={a.image?.[2]?.['#text'] || a.image?.[1]?.['#text']} />
                        ))}
                    </div>
                </section>
                <section className="section">
                    <h2 className="section-title">Popular tracks</h2>
                    <div className="tracks-grid">
                        {tracks.slice(0, 12).map((t, i) => (
                            <TrackCard key={i} name={t.name} artist={t.artist?.name || t.artist} image={t.image?.[1]?.['#text']} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="site-footer"><div className="container small">React версия</div></footer>
        </>
    );
}

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

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    );
}

