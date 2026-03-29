import React, { useState, useEffect } from 'react';
import { searchArtist, searchAlbum, searchPlaylist } from '../services/spotifyService.js';


// import Footer from "../components/Footer";
import logo from "../logo.svg";

function LandingPage() {
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = 'Miles Davis';
        const art = await searchArtist(query);
        const alb = await searchAlbum(query);
        const pl = await searchPlaylist(query);
        setArtist(art);
        setAlbum(alb);
        setPlaylist(pl);
      } catch (error) {
        console.error('Error fetching feature data:', error);
      }
    };
    fetchData();
  }, []);

  return (

    <section className="landing-section">
      <div className="landing-content">
        <h1>Welcome to Vibe</h1>
        <p>Vibe is a personalized music analytics dashboard that gives you powerful insights into your listening world. You can compare artists side by side, track popularity trends over time, and explore your listening habits through comprehensive stats all in one place.
        </p>
        <h2>Search any artist</h2>
        <p>
          Get instant insights on popularity, follower count, genres, and more here is a examples:
        </p>
<table className="api-data-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Name</th>
      <th>Key Metrics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Artist</td>
      <td>{artist?.name || 'N/A'}</td>
      <td>
        Followers: {artist?.followers?.total?.toLocaleString() || 'N/A'} | 
        Popularity: {artist?.popularity || 'N/A'}
      </td>
    </tr>
    <tr>
      <td>Album</td>
      <td>{album?.name || 'N/A'}</td>
      <td>Tracks: {album?.total_tracks || 0}</td>
    </tr>
    <tr>
      <td>Playlist</td>
      <td>{playlist?.name || 'N/A'}</td>
      <td>Followers: {playlist?.followers?.total?.toLocaleString() || 'N/A'}</td>
    </tr>
  </tbody>
</table>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Songs Analyzed</td>
                <td>1,542</td>
              </tr>
              <tr>
                <td>Unique Artists</td>
                <td>89</td>
              </tr>
              <tr>
                <th>Avg Popularity</th>
                <td>67.4%</td>
              </tr>
              <tr>
                <td>Avg Track Duration</td>
                <td>3:28</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default LandingPage;
