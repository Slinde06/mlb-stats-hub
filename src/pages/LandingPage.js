import { Link } from 'react-router-dom';    //nav
import vibeLogo from '../vibelogo.png';     //logo
import '../App.css';                        //CSS styling

function LandingPage() {                    // LandingPage
  return (
    <section className="landing-section">
      
      <div className="hero-section"> 
        <img src={vibeLogo} alt="MLB Logo" className="hero-logo" /> 
        <h1>MLB Live Scores & Stats</h1>
        
        <p>
          Real-time MLB game scores, top performers, and live statistics. 
          Track every pitch, hit, and home run across the league with stunning visualizations.
        </p> 

        <div className="cta-buttons"> 
          <Link to="/timeline" className="cta-btn primary">
            Live Scores Timeline
          </Link> 
          
          <Link to="/comparison" className="cta-btn secondary">
            Player Comparison
          </Link>
        </div>
      </div>

      <div className="features-section"> 
        <h2 className="section-title">Why Choose MLB Stats Hub?</h2> 
        
        <div className="feature-grid">
          
          <div className="feature-card">
            <h3>Live Game Scores</h3>
            <p>
              Real-time scores from every MLB game. Away vs Home, final scores, innings, 
              and game status updates powered by official MLB statistics API.
            </p> 
            <Link to="/timeline" className="cta-btn small">View Scores</Link> 
          </div>
          
          <div className="feature-card">
            <h3>Top Performers</h3>
            <p>
              Player stats, home runs, strikeouts, batting averages, and pitcher performance. 
              Compare stars like Aaron Judge vs Shohei Ohtani across metrics.
            </p>
            <Link to="/comparison" className="cta-btn small">Compare Players</Link> 
          </div>
          
          <div className="feature-card">
            <h3>Interactive Charts</h3>
            <p>
              Beautiful bar charts, timelines, and score visualizations. 
              Track seasonal trends, daily recaps, and historical data with smooth animations.
            </p>
          </div>

        </div>
      </div>

      <div className="kpi-grid">
        
        <div className="kpi-card">
          <h3>2,430</h3>
          <p>Games Per Season</p>
        </div>
        
        <div className="kpi-card">
          <h3>162</h3>
          <p>Games Per Team</p>
        </div>
        
        <div className="kpi-card">
          <h3>Live</h3>
          <p>Real-time Updates</p>
        </div>
        
        <div className="kpi-card">
          <h3>30</h3>
          <p>MLB Teams</p>
        </div>

      </div>
    </section>
  );
}

export default LandingPage;