import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import LiveMatches from './components/LiveMatches';
import Standings from './components/Standings';
import Teams from './components/Teams';
import Updates from './components/Updates';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [news, setNews] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news/football');
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles.slice(0, 12));
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveMatches = async () => {
    try {
      const response = await fetch('/api/football/live-matches');
      const data = await response.json();
      if (data.matches) {
        setLiveMatches(data.matches.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching live matches:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchLiveMatches();
  }, []);

  return (
    <div className="app">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <div className="content-grid">
              <div className="main-content-area">
                <NewsGrid news={news} loading={loading} />
              </div>
              <div className="sidebar">
                <LiveMatches matches={liveMatches} />
                <Standings />
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'news' && <NewsGrid news={news} loading={loading} />}
        {activeTab === 'live' && <LiveMatches matches={liveMatches} />}
        {activeTab === 'standings' && <Standings />}
        {activeTab === 'teams' && <Teams />}
        {activeTab === 'updates' && <Updates />}
      </main>
    </div>
  );
}

export default App; 