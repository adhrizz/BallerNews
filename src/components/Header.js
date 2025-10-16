import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
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
          <nav className="header-nav">
            {token ? (
              <button onClick={handleLogout} className="nav-link">LOGOUT</button>
            ) : (
              <>
                <Link to="/login" className={`nav-link ${location.pathname.startsWith('/login') ? 'active' : ''}`}>SIGN IN</Link>
                <Link to="/signup" className={`nav-link ${location.pathname.startsWith('/signup') ? 'active' : ''}`}>SIGN UP</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
