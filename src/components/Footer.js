import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/comparison">Comparison</Link>
          <Link to="/timeline">Timeline</Link>
        </nav>
        <div className="footer-info">
          <p>Created by:Shaun Linde 251208</p>
          <p>Email: vibe@gmail.com</p>
          <p>Phone: 0609381536</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

