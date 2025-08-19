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
              Stay updated with the latest news, live scores, transfer updates, and everything football from around the world.
            </p>
            <div className="hero-actions">
              <button className="hero-btn primary" onClick={go('news')}>Explore News</button>
              <button className="hero-btn secondary" onClick={go('live')}>Live Matches</button>
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
              onClick={go('live')}
              role="button"
              tabIndex={0}
              onKeyDown={onKey('live')}
              aria-label="Go to Live Matches"
            >
              <div className="card-content">
                <span className="card-icon">⚽</span>
                <span className="card-text">Live Scores</span>
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
              className="floating-card card-3"
              onClick={go('updates')}
              role="button"
              tabIndex={0}
              onKeyDown={onKey('updates')}
              aria-label="Go to Transfer Updates"
            >
              <div className="card-content">
                <span className="card-icon">🔄</span>
                <span className="card-text">Transfer Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 