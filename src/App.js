import './styles/global.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import LiveMatches from './components/LiveMatches';
import NewsFeed from './components/NewsFeed';
import Standings from './components/Standings';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/App.css';

function App() {
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
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
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
          } />
          <Route path="/news" element={<NewsGrid news={news} loading={loading} />} />
          <Route path="/feed" element={<NewsFeed />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
