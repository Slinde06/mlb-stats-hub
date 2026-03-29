import React from 'react';
import './App.css';
import vibeLogo from './vibelogo.png';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from './pages/LandingPage';
import Comparison from './pages/ComparisonPage';
import Timeline from './pages/TimelinePage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <header className="header-nav">
          <img src={vibeLogo} alt="Vibe Logo" className="navbar-logo" />
          <nav className="nav-menu">
            <Link to="/">LandingPage</Link>
            <Link to="/comparison">Comparison</Link>
            <Link to="/timeline">Timeline</Link>
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
