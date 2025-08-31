import React from 'react';
import './Hero.css';

const Hero = ({ setActiveTab }) => {
  const go = (tab) => () => setActiveTab && setActiveTab(tab);
  const onKey = (tab) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab && setActiveTab(tab);
    }
  };

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
              <button className="hero-btn primary" onClick={go('news')}>Explore News</button>
              <button className="hero-btn secondary" onClick={go('standings')}>View Standings</button>
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

            <div
              className="floating-card card-1"
              onClick={go('standings')}
              role="button"
              tabIndex={0}
              onKeyDown={onKey('standings')}
              aria-label="Go to Standings"
            >
              <div className="card-content">
                <span className="card-icon">🏆</span>
                <span className="card-text">League Standings</span>
              </div>
            </div>

            <div
              className="floating-card card-2"
              onClick={go('news')}
              role="button"
              tabIndex={0}
              onKeyDown={onKey('news')}
              aria-label="Go to Latest News"
            >
              <div className="card-content">
                <span className="card-icon">📰</span>
                <span className="card-text">Latest News</span>
              </div>
            </div>

            <div
              className="floating-card card-4"
              onClick={go('feed')}
              role="button"
              tabIndex={0}
              onKeyDown={onKey('feed')}
              aria-label="Go to Feed"
            >
              <div className="card-content">
                <span className="card-icon">📜</span>
                <span className="card-text">Feed</span>
              </div>
            </div>
            
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