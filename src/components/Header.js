import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = ()_> {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <h1>Ballers</h1>
          </div>
          <nav className="header-nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>
            <Link to="/news" className={`nav-link ${location.pathname.startsWith('/news') ? 'active' : ''}`}>NEWS</Link>
            <Link to="/feed" className={`nav-link ${location.pathname.startsWith('/feed') ? 'active' : ''}`}>FEED</Link>
            <Link to="/standings" className={`nav-link ${location.pathname.startsWith('/standings') ? 'active' : ''}`}>STANDINGS</Link>
          </nav>
        </div>
        
        <div className="header-right">
          <div className="user-actions">
            {token ? (
              <button onClick={handleLogout} className="btn-primary">Logout</button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-secondary">Sign In</button>
                <button onClick={() => navigate('/signup')} className="btn-primary">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
