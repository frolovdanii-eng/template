import React from 'react';

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

export default TrackCard;