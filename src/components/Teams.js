import React, { useState } from 'react';
import './Teams.css';

const Teams = () => {
  const [teamId, setTeamId] = useState('');
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const popularTeams = [
    { id: '33', name: 'Manchester United' },
    { id: '39', name: 'Liverpool' },
    { id: '41', name: 'Arsenal' },
    { id: '42', name: 'Everton' },
    { id: '34', name: 'Newcastle United' },
    { id: '35', name: 'Bournemouth' }
  ];

  const fetchTeamInfo = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/football/teams/${id}`);
      const data = await response.json();
      setTeamInfo(data);
    } catch (error) {
      console.error('Error fetching team info:', error);
      setTeamInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTeamInfo(teamId);
  };

  return (
    <div className="teams-container">
      <div className="section-header">
        <h3>Team Information</h3>
      </div>

      <div className="teams-content">
        <div className="search-section">
          <form onSubmit={handleSubmit} className="team-search-form">
            <div className="input-group">
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Enter team ID (e.g., 33 for Manchester United)"
                className="team-input"
              />
              <button type="submit" className="search-btn" disabled={loading}>
                {loading ? 'Loading...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="popular-teams">
            <h4>Popular Teams</h4>
            <div className="teams-grid">
              {popularTeams.map(team => (
                <button
                  key={team.id}
                  onClick={() => {
                    setTeamId(team.id);
                    fetchTeamInfo(team.id);
                  }}
                  className="team-card"
                >
                  <span className="team-name">{team.name}</span>
                  <span className="team-id">ID: {team.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="team-info-section">
          {loading && (
            <div className="loading-team">
              <div className="team-skeleton">
                <div className="skeleton-header"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              </div>
            </div>
          )}

          {teamInfo && !loading && (
            <div className="team-info-card">
              <div className="team-header">
                <h2 className="team-title">{teamInfo.name}</h2>
                <span className="team-country">{teamInfo.area?.name || 'Unknown'}</span>
              </div>
              <div className="team-details">
                <div className="detail-item">
                  <span className="detail-label">Founded:</span>
                  <span className="detail-value">{teamInfo.founded || 'Unknown'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Venue:</span>
                  <span className="detail-value">{teamInfo.venue || 'Unknown'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Website:</span>
                  <a 
                    href={teamInfo.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    {teamInfo.website || 'N/A'}
                  </a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Colors:</span>
                  <span className="detail-value">{teamInfo.clubColors || 'Unknown'}</span>
                </div>
              </div>
            </div>
          )}

          {!teamInfo && !loading && teamId && (
            <div className="no-team">
              <p>Team not found. Please check the team ID.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams; 