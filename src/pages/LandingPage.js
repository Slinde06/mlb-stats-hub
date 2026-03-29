import { Link } from 'react-router-dom';
import vibeLogo from '../vibelogo.png';
import '../App.css';

function LandingPage() {
  return (
    <section className="landing-section">
      <div className="hero-section">
        <img src={vibeLogo} alt="Vibe Logo" className="hero-logo" />
        <h1>Discover Your Spotify Vibe</h1>
        <p>Unlock deep insights into your favorite artists. Compare stats, explore timelines, and visualize top tracks with stunning charts and data.</p>
        <div className="cta-buttons">
          <Link to="/comparison" className="cta-btn primary">
            Compare Artists
          </Link>
          <Link to="/timeline" className="cta-btn secondary">
            Explore Timeline
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Vibe?</h2>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Side-by-Side Artist Comparison</h3>
            <p>Compare your favorite artists like Drake vs Taylor Swift. See followers, popularity, top tracks, and more in beautiful bar charts and metrics. Dive deep into who dominates the charts!</p>
            <Link to="/comparison" className="cta-btn small">Start Comparing</Link>
          </div>
          
          <div className="feature-card">
            <h3>Artist Timeline Evolution</h3>
            <p>Track an artist's journey over time. Visualize follower growth, popularity changes, album releases, and hit track evolution. See how legends like Miles Davis built their legacy.</p>
            <Link to="/timeline" className="cta-btn small">View Timeline</Link>
          </div>
          
          <div className="feature-card">
            <h3>Complete Spotify Insights</h3>
            <p>Top tracks, albums, playlists, even podcasts/episodes related to your artist. Get average durations, totals, and previews – everything you need powered by Spotify's API.</p>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>1M+</h3>
          <p>Artists Explored</p>
        </div>
        <div className="kpi-card">
          <h3>500K+</h3>
          <p>Comparisons Made</p>
        </div>
        <div className="kpi-card">
          <h3>10B+</h3>
          <p>Streams Analyzed</p>
        </div>
        <div className="kpi-card">
          <h3>Instant</h3>
          <p>Real-time Data</p>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;