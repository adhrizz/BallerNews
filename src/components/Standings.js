import React, { useState, useEffect } from 'react';
import './Standings.css';

const Standings = () => {
	const [standings, setStandings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedLeague, setSelectedLeague] = useState('2021'); // Premier League

	const leagues = [
		{ id: '2021', name: 'Premier League' },
		{ id: '2014', name: 'La Liga' },
		{ id: '2002', name: 'Bundesliga' },
		{ id: '2019', name: 'Serie A' },
		{ id: '2015', name: 'Ligue 1' }
	];

	const fetchStandings = async (leagueId) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/football/standings/${leagueId}`);
			const data = await response.json();

			// Normalize to a common table shape
			let table = [];
			// Football-Data.org shape
			if (data?.standings?.length > 0 && data.standings[0]?.table) {
				table = data.standings[0].table;
			} else if (Array.isArray(data?.response) && data.response[0]?.league?.standings?.[0]) {
				// API-Football shape
				const apiFootballTable = data.response[0].league.standings[0];
				table = apiFootballTable.map((row) => ({
					position: row.rank,
					team: { name: row.team?.name || '' },
					playedGames: row.all?.played ?? row.played ?? 0,
					won: row.all?.win ?? row.won ?? 0,
					draw: row.all?.draw ?? row.draw ?? 0,
					lost: row.all?.lose ?? row.lose ?? 0,
					points: row.points ?? 0,
				}));
			}

			setStandings(table);
		} catch (error) {
			console.error('Error fetching standings:', error);
			setStandings([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStandings(selectedLeague);
	}, [selectedLeague]);

	return (
		<div className="standings-container">
			<div className="section-header">
				<h3>League Standings</h3>
				<select 
					value={selectedLeague} 
					onChange={(e) => setSelectedLeague(e.target.value)}
					className="league-select"
				>
					{leagues.map(league => (
						<option key={league.id} value={league.id}>
							{league.name}
						</option>
					))}
				</select>
			</div>

			{loading ? (
				<div className="loading-standings">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="standing-row-skeleton">
							<div className="skeleton-position"></div>
							<div className="skeleton-team"></div>
							<div className="skeleton-stats"></div>
						</div>
					))}
				</div>
			) : standings.length > 0 ? (
				<div className="standings-table">
					<div className="table-header">
						<div className="header-cell">Pos</div>
						<div className="header-cell">Team</div>
						<div className="header-cell">P</div>
						<div className="header-cell">W</div>
						<div className="header-cell">D</div>
						<div className="header-cell">L</div>
						<div className="header-cell">Pts</div>
					</div>
					<div className="table-body">
						{standings.map((team, index) => (
							<div key={index} className={`table-row ${index < 4 ? 'champions-league' : index < 6 ? 'europa-league' : index > 16 ? 'relegation' : ''}`}>
								<div className="cell position">{team.position}</div>
								<div className="cell team-name">{team.team.name}</div>
								<div className="cell">{team.playedGames}</div>
								<div className="cell">{team.won}</div>
								<div className="cell">{team.draw}</div>
								<div className="cell">{team.lost}</div>
								<div className="cell points">{team.points}</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="no-standings">
					<p>No standings available</p>
					<p className="sub-text">Please check your API configuration</p>
				</div>
			)}
		</div>
	);
};

export default Standings; 