import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Ultimate Football Destination
            </h1>
            <p className="hero-subtitle">
              Stay updated with the latest news, live matches, and standings from around the football world.
            </p>
            <div className="hero-actions">
              <Link to="/news" className="hero-btn primary">Explore News</Link>
              <Link to="/standings" className="hero-btn secondary">View Standings</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Live Coverage</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">News Sources</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Leagues</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <Link to="/standings" className="floating-card card-1" aria-label="Go to Standings">
              <div className="card-content">
                <span className="card-icon">🏆</span>
                <span className="card-text">League Standings</span>
              </div>
            </Link>

            <Link to="/news" className="floating-card card-2" aria-label="Go to Latest News">
              <div className="card-content">
                <span className="card-icon">📰</span>
                <span className="card-text">Latest News</span>
              </div>
            </Link>

            <Link to="/feed" className="floating-card card-4" aria-label="Go to Feed">
              <div className="card-content">
                <span className="card-icon">📜</span>
                <span className="card-text">Feed</span>
              </div>
            </Link>

            <div
              className="floating-card card-3"
              onClick={() => window.scrollTo({ top: document.querySelector('.sidebar').offsetTop, behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.scrollTo({ top: document.querySelector('.sidebar').offsetTop, behavior: 'smooth' });
                }
              }}
              aria-label="View Live Matches"
            >
              <div className="card-content">
                <span className="card-icon">⚽</span>
                <span className="card-text">Live Matches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
