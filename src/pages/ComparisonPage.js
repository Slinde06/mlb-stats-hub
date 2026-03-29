import React, { useState } from 'react';
import { searchArtist } from "../services/spotifyService";
import { Bar } from 'react-chartjs-2';
import ArtistCard from '../components/ArtistCard';
// import Footer from '../components/Footer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ComparisonPage() {
  const [queryLeft, setQueryLeft] = useState("");
  const [artistLeft, setArtistLeft] = useState(null);
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [queryRight, setQueryRight] = useState("");
  const [artistRight, setArtistRight] = useState(null);
  const [loadingRight, setLoadingRight] = useState(false);

  const handleSearchLeft = async () => {
    if (!queryLeft) return;

    setLoadingLeft(true);

    try {
      const data = await searchArtist(queryLeft);
      setArtistLeft(data);
    } catch (error) {
      console.error(error);
    }

    setLoadingLeft(false);
  };

  const handleSearchRight = async () => {
    if (!queryRight) return;

    setLoadingRight(true);

    try {
      const data = await searchArtist(queryRight);
      setArtistRight(data);
    } catch (error) {
      console.error(error);
    }

    setLoadingRight(false);
  };

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
      <div className="dual-search">
        <div className="search-column">
          <h3>Left Artist</h3>
          <input
            type="text"
            placeholder="Enter left artist name"
            value={queryLeft}
            onChange={(e) => setQueryLeft(e.target.value)}
          />
          <button onClick={handleSearchLeft}>Search Left</button>
          {loadingLeft && <p>Loading...</p>}
          {artistLeft && (
            <div className="searched-artist left">
              <img src={artistLeft.images?.[0]?.url} width="80" alt="left" />
              <span>{artistLeft.name}</span>
              <p>Followers: {artistLeft.followers?.total?.toLocaleString()}</p>
              <p>Popularity: {artistLeft.popularity}</p>
            </div>
          )}
        </div>
        <div className="search-column">
          <h3>Right Artist</h3>
          <input
            type="text"
            placeholder="Enter right artist name"
            value={queryRight}
            onChange={(e) => setQueryRight(e.target.value)}
          />
          <button onClick={handleSearchRight}>Search Right</button>
          {loadingRight && <p>Loading...</p>}
          {artistRight && (
            <div className="searched-artist right">
              <img src={artistRight.images?.[0]?.url} width="80" alt="right" />
              <span>{artistRight.name}</span>
              <p>Followers: {artistRight.followers?.total?.toLocaleString()}</p>
              <p>Popularity: {artistRight.popularity}</p>
            </div>
          )}
        </div>
        <div className="preview-results">
          {artistLeft && (
            <div className="artist-preview">
              <img src={artistLeft.images?.[0]?.url} width="60" alt="left" />
              <span>{artistLeft.name}</span>
            </div>
          )}
          {artistRight && (
            <div className="artist-preview">
              <img src={artistRight.images?.[0]?.url} width="60" alt="right" />
              <span>{artistRight.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="chart-container">
        {artistLeft && artistRight ? (
          <Bar
            data={{
              labels: ['Popularity', 'Followers (10M)'],
              datasets: [
                {
                  label: artistLeft.name,
                  data: [artistLeft.popularity, (artistLeft.followers?.total || 0) / 10000000],
                  backgroundColor: 'rgba(54, 162, 235, 0.8)',
                },
                {
                  label: artistRight.name,
                  data: [artistRight.popularity, (artistRight.followers?.total || 0) / 10000000],
                  backgroundColor: 'rgba(255, 99, 132, 0.8)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `${artistLeft.name} vs ${artistRight.name}`,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p style={{
            textAlign: 'center',
            color: 'var(--muted)'
          }}>Search two artists above to see comparison chart</p>
        )}
      </div>
      <div className="comparison-container">
        <ArtistCard artist={artistLeft || artist1} />
        <ArtistCard artist={artistRight || artist2} />
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default ComparisonPage;

