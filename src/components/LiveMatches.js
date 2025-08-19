import React, { useState, useEffect } from 'react';
import './LiveMatches.css';

const LiveMatches = ({ matches: propMatches }) => {
  const [matches, setMatches] = useState(propMatches || []);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (!propMatches) {
      fetchLiveMatches();
    }
  }, [propMatches]);

  if (loading) {
    return (
      <div className="live-matches-container">
        <div className="section-header">
          <h3>Live Matches</h3>
          <button className="refresh-btn" onClick={fetchLiveMatches}>🔄</button>
        </div>
        <div className="loading-matches">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="match-card-skeleton">
              <div className="skeleton-teams"></div>
              <div className="skeleton-score"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="live-matches-container">
      <div className="section-header">
        <h3>Live Matches</h3>
        <button className="refresh-btn" onClick={fetchLiveMatches}>🔄</button>
      </div>
      
      {matches.length > 0 ? (
        <div className="matches-list">
          {matches.map((match, index) => (
            <div key={index} className="match-card">
              <div className="match-teams">
                <div className="team home">
                  <span className="team-name">{match.homeTeam?.name || 'TBD'}</span>
                </div>
                <div className="match-score">
                  <span className="score">
                    {match.score?.fullTime?.home || 0} - {match.score?.fullTime?.away || 0}
                  </span>
                  <span className="match-status">{match.status || 'LIVE'}</span>
                </div>
                <div className="team away">
                  <span className="team-name">{match.awayTeam?.name || 'TBD'}</span>
                </div>
              </div>
              <div className="match-info">
                <span className="match-time">{match.venue || 'Unknown venue'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-matches">
          <p>No live matches at the moment</p>
          <p className="sub-text">Check back during match days!</p>
        </div>
      )}
    </div>
  );
};

export default LiveMatches; 