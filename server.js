require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Sample football data
let footballUpdates = [
    {
        id: 1,
        title: "Premier League Match Day 1",
        content: "Manchester United vs Liverpool ends 2-2. Exciting match with goals from both sides.",
        date: "2024-01-15",
        category: "Premier League"
    },
    {
        id: 2,
        title: "Champions League Quarter Finals",
        content: "Real Madrid advances to semi-finals after defeating Bayern Munich 3-1.",
        date: "2024-01-14",
        category: "Champions League"
    },
    {
        id: 3,
        title: "Transfer News: Star Player Move",
        content: "Erling Haaland reportedly considering move to Barcelona in summer transfer window.",
        date: "2024-01-13",
        category: "Transfer News"
    }
];

// Football API helper functions
async function fetchFromFootballDataAPI(endpoint) {
    try {
        const response = await axios.get(`${config.footballDataAPI.baseURL}${endpoint}`, {
            headers: {
                'X-Auth-Token': config.footballDataAPI.key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Football Data API Error:', error.message);
        return null;
    }
}

async function fetchFromFootballAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(`${config.footballAPI.baseURL}${endpoint}`, {
            headers: {
                'x-rapidapi-key': config.footballAPI.key,
                'x-rapidapi-host': config.footballAPI.host
            },
            params
        });
        return response.data;
    } catch (error) {
        console.error('Football API Error:', error.message);
        return null;
    }
}

// News API helper functions
async function fetchFromNewsAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(`${config.newsAPI.baseURL}${endpoint}`, {
            params: {
                ...params,
                apiKey: config.newsAPI.key
            }
        });
        return response.data;
    } catch (error) {
        console.error('News API Error:', error.message);
        return null;
    }
}

async function fetchFromGNewsAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(`${config.gNewsAPI.baseURL}${endpoint}`, {
            params: {
                ...params,
                token: config.gNewsAPI.key
            }
        });
        return response.data;
    } catch (error) {
        console.error('GNews API Error:', error.message);
        return null;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes for local updates
app.get('/api/updates', (req, res) => {
    res.json(footballUpdates);
});

app.post('/api/updates', (req, res) => {
    const { title, content, category } = req.body;
    
    if (!title || !content || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newUpdate = {
        id: footballUpdates.length + 1,
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0]
    };
    
    footballUpdates.unshift(newUpdate);
    res.status(201).json(newUpdate);
});

app.delete('/api/updates/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = footballUpdates.findIndex(update => update.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Update not found' });
    }
    
    footballUpdates.splice(index, 1);
    res.json({ message: 'Update deleted successfully' });
});

// Football API Routes - Prioritizing Football-Data.org
app.get('/api/football/live-matches', async (req, res) => {
    try {
        // Try Football-Data.org first (primary)
        let liveMatches = await fetchFromFootballDataAPI('/matches?status=LIVE');
        
        if (!liveMatches || !liveMatches.matches || liveMatches.matches.length === 0) {
            // Fallback to API-Football
            liveMatches = await fetchFromFootballAPI('/fixtures', { live: 'all' });
        }
        
        if (liveMatches) {
            res.json(liveMatches);
        } else {
            res.status(500).json({ error: 'Unable to fetch live matches' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching live matches' });
    }
});

app.get('/api/football/standings/:leagueId', async (req, res) => {
    try {
        const { leagueId } = req.params;
        const { season = '2024' } = req.query;
        
        // Try Football-Data.org first
        let standings = await fetchFromFootballDataAPI(`/competitions/${leagueId}/standings`);
        
        if (!standings || !standings.standings) {
            // Fallback to API-Football
            standings = await fetchFromFootballAPI('/standings', { 
                league: leagueId, 
                season: season 
            });
        }
        
        if (standings) {
            res.json(standings);
        } else {
            res.status(500).json({ error: 'Unable to fetch standings' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching standings' });
    }
});

app.get('/api/football/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        
        // Try Football-Data.org first
        let teamInfo = await fetchFromFootballDataAPI(`/teams/${teamId}`);
        
        if (!teamInfo) {
            // Fallback to API-Football
            teamInfo = await fetchFromFootballAPI('/teams', { id: teamId });
        }
        
        if (teamInfo) {
            res.json(teamInfo);
        } else {
            res.status(500).json({ error: 'Unable to fetch team information' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching team information' });
    }
});

app.get('/api/football/leagues', async (req, res) => {
    try {
        // Try Football-Data.org first
        let leagues = await fetchFromFootballDataAPI('/competitions');
        
        if (!leagues || !leagues.competitions) {
            // Fallback to API-Football
            leagues = await fetchFromFootballAPI('/leagues');
        }
        
        if (leagues) {
            res.json(leagues);
        } else {
            res.status(500).json({ error: 'Unable to fetch leagues' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leagues' });
    }
});

app.get('/api/football/matches/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { season = '2024' } = req.query;
        
        // Try Football-Data.org first
        let matches = await fetchFromFootballDataAPI(`/teams/${teamId}/matches?season=${season}`);
        
        if (!matches || !matches.matches) {
            // Fallback to API-Football
            matches = await fetchFromFootballAPI('/fixtures', { 
                team: teamId, 
                season: season 
            });
        }
        
        if (matches) {
            res.json(matches);
        } else {
            res.status(500).json({ error: 'Unable to fetch matches' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching matches' });
    }
});

// News API Routes
app.get('/api/news/football', async (req, res) => {
    try {
        const { source = 'all', page = 1 } = req.query;
        
        // Try NewsAPI.org first
        let news = await fetchFromNewsAPI('/everything', {
            q: '(football OR soccer) AND (premier league OR champions league OR la liga OR bundesliga OR serie a OR ligue 1)',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 20,
            page: page
        });
        
        if (!news || !news.articles) {
            // Fallback to GNews
            news = await fetchFromGNewsAPI('/search', {
                q: 'football Premier League Champions League La Liga Bundesliga Serie A Ligue 1',
                lang: 'en',
                country: 'us',
                max: 20
            });
        }
        
        if (news) {
            if(news.articles){
                news.articles = news.articles.filter(article => {
                    const title = article.title?.toLowerCase() || '';
                    const description = article.description?.toLowerCase() || '';
                    const content = article.content?.toLowerCase() || '';

                    const footballTerms = [
                        'football','soccer', 'premier league', 'champions league', 
                        'la liga', 'bundesliga', 'serie a', 'mls', 'world cup',
                        'european championship', 'transfer', 'fixture', 'match',
                        'goal', 'striker', 'midfielder', 'defender', 'goalkeeper'
                    ];

                    return footballTerms.some(term => 
                        title.includes(term) || 
                        description.includes(term) ||
                        content.includes(term)
                    );
                });
            }
            res.json(news);
        }else{
            res.status(500).json({error : 'Unable to fetch football news'});
        }
    }catch(error){
        res.status(500).json({error : 'Error fetching football news'})
    }
});

app.get('/api/news/transfer', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        
        // Try NewsAPI.org first
        let news = await fetchFromNewsAPI('/everything', {
            q: 'transfer news football',
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 20,
            page: page
        });
        
        if (!news || !news.articles) {
            // Fallback to GNews
            news = await fetchFromGNewsAPI('/search', {
                q: 'transfer news football',
                lang: 'en',
                country: 'us',
                max: 20
            });
        }
        
        if (news) {
            res.json(news);
        } else {
            res.status(500).json({ error: 'Unable to fetch transfer news' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transfer news' });
    }
});

app.get('/api/news/team/:teamName', async (req, res) => {
    try {
        const { teamName } = req.params;
        const { page = 1 } = req.query;
        
        // Try NewsAPI.org first
        let news = await fetchFromNewsAPI('/everything', {
            q: `${teamName} football`,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 20,
            page: page
        });
        
        if (!news || !news.articles) {
            // Fallback to GNews
            news = await fetchFromGNewsAPI('/search', {
                q: `${teamName} football`,
                lang: 'en',
                country: 'us',
                max: 20
            });
        }
        
        if (news) {
            res.json(news);
        } else {
            res.status(500).json({ error: 'Unable to fetch team news' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching team news' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Football Updates Server running on http://localhost:${PORT}`);
    console.log('Football-Data.org API Integration Ready!');
    console.log('News API Integration Ready!');
    console.log('To use live football data and news, set your API keys in config.js');
});
