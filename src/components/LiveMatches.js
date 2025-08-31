import React, { useState, useEffect } from 'react';
import './LiveMatches.css';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/football/live-matches');
      const data = await response.json();
      if (data.matches) {
        setMatches(data.matches.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching live matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="live-matches-container">
        <div className="section-header">
          <h3>Live Matches</h3>
        </div>
        <div className="loading-matches">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="match-card-skeleton">
              <div className="skeleton-teams"></div>
              <div className="skeleton-score"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="live-matches-container">
        <div className="section-header">
          <h3>Live Matches</h3>
        </div>
        <div className="no-matches">
          <p>No live matches at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-matches-container">
      <div className="section-header">
        <h3>Live Matches</h3>
      </div>
      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-teams">
              <div className="team home">
                <span className="team-name">{match.homeTeam?.name || 'TBD'}</span>
              </div>
              <div className="match-score">
                <span className="score">{match.score?.fullTime?.home || 0} - {match.score?.fullTime?.away || 0}</span>
                <span className="match-time">LIVE</span>
              </div>
              <div className="team away">
                <span className="team-name">{match.awayTeam?.name || 'TBD'}</span>
              </div>
            </div>
            <div className="match-info">
              <span className="competition">{match.competition?.name || 'League'}</span>
              <span className="venue">{match.venue || 'TBD'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatches;
