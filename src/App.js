import React from 'react'; // Laai die React
import './App.css'; //CSS 
import vibeLogo from './vibelogo.png'; //logo
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/LandingPage'; //Landing
import Comparison from './pages/ComparisonPage'; //Comparison
import Timeline from './pages/TimelinePage'; //Timeline
import Footer from './components/Footer'; //Footer

function App() { // Main App
  return (
    <BrowserRouter>
      <div className="main-container">
        
        <header className="header-nav">
          <img src={vibeLogo} alt="Vibe Logo" className="navbar-logo" /> {/*logo */}
          
          <nav className="nav-menu"> {/* Nav*/}
            <Link to="/">LandingPage</Link> {/* landing */}
            <Link to="/comparison">Comparison</Link> {/* comparison */}
            <Link to="/timeline">Timeline</Link> {/* timeline  */}
          </nav>
        </header>

        <main className="main-content"> 
          <Routes> 
            <Route path="/" element={<Landing />} />
            <Route path="/comparison" element={<Comparison />} /> 
            <Route path="/timeline" element={<Timeline/>} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;