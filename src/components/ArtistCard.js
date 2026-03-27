import React from 'react';

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
      <div className="artist-info">
        <h2>{artist.name}</h2>
        <p>Followers: {artist.followers.total.toLocaleString()}</p>
        <p>Popularity: {artist.popularity}</p>
      </div>
    </div>
  );
}

export default ArtistCard;

