import React from 'react';

function ArtistCard({ artist }) {
  if (!artist) return null;
  
  return (
    <div className="artist-card">
      <img 
        src={artist.images?.[0]?.url || ''}
        alt={artist.name || 'Artist'}
        className="artist-image"
      />
      <div className="artist-info">
        <h2>{artist.name || 'No Artist'}</h2>
        <p>Followers: {artist.followers?.total?.toLocaleString() || 'N/A'}</p>
        <p>Popularity: {artist.popularity || 'N/A'}</p>
      </div>
    </div>
  );
}

export default ArtistCard;

