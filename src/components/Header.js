import React from 'react';
import './Header.css';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'HOME'},
    { id: 'news', label: 'NEWS' },
    { id: 'feed', label: 'FEED' },
    { id: 'standings', label: 'STANDINGS'}
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <h1>Ballers</h1>
          </div>
          <nav className="header-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
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