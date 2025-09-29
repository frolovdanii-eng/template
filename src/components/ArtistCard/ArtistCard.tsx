import React from 'react';
import './ArtistCard.css'

function ArtistCard({ name, image }: { name: string; image?: string }) {
    return (
        <article className="artist">
            <img src={image || 'https://picsum.photos/seed/artist/220'} alt={name} />
            <h3 className="artist-name">{name}</h3>
            <p className="meta">artist</p>
        </article>
    );
}

export default ArtistCard;