import React from 'react';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import TrackCard from '../../components/TrackCard/TrackCard';
import api from '../../api/api';
import './HomePage.css'


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
        </>
    );
}

export default HomePage;