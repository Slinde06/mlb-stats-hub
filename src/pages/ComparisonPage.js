import React from 'react';
import ArtistCard from '../components/ArtistCard';

function ComparisonPage() {
  
  const artist1 = {
    name: 'Artist 1',
    followers: { total: 10000000 },
    popularity: 85,
    images: [{ url: '' }]
  };

  const artist2 = {
    name: 'Artist 2', 
    followers: { total: 8500000 },
    popularity: 78,
    images: [{ url: '' }]
  };

  return (
    <section className="landing-section">
      <div className="landing-content">
        <h1>Welcome to Comparison</h1>
        <p>Compare your favorite artists side by side</p>
      </div>
      <div className="comparison-container">
        <ArtistCard artist={artist1} />
        <ArtistCard artist={artist2} />
      </div>
    </section>
  );
}

export default ComparisonPage;

