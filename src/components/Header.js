import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <h1>Ballers</h1>
          </div>
          <nav className="header-nav">
            <a href="#scores" className="nav-link">SCORES</a>
            <a href="#latest" className="nav-link">LATEST</a>
            <a href="#competitions" className="nav-link">COMPETITIONS</a>
            <a href="#lifestyle" className="nav-link">LIFESTYLE</a>
            <a href="#betting" className="nav-link">BETTING</a>
          </nav>
        </div>
        
        <div className="header-right">
          <div className="user-actions">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 