require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");
const config = require("./config");

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Football API helper functions
async function fetchFromFootballDataAPI(endpoint) {
    try {
        const response = await axios.get(
            `${config.footballDataAPI.baseURL}${endpoint}`,
            {
                headers: {
                    "X-Auth-Token": config.footballDataAPI.key,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Football Data API Error:", error.message);
        return null;
    }
}

async function fetchFromFootballAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(
            `${config.footballAPI.baseURL}${endpoint}`,
            {
                headers: {
                    "x-rapidapi-key": config.footballAPI.key,
                    "x-rapidapi-host": config.footballAPI.host,
                },
                params,
            },
        );
        return response.data;
    } catch (error) {
        console.error("Football API Error:", error.message);
        return null;
    }
}

// News API helper functions
async function fetchFromNewsAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(
            `${config.newsAPI.baseURL}${endpoint}`,
            {
                params: {
                    ...params,
                    apiKey: config.newsAPI.key,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("News API Error:", error.message);
        return null;
    }
}

async function fetchFromGNewsAPI(endpoint, params = {}) {
    try {
        const response = await axios.get(
            `${config.gNewsAPI.baseURL}${endpoint}`,
            {
                params: {
                    ...params,
                    token: config.gNewsAPI.key,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("GNews API Error:", error.message);
        return null;
    }
}

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Football API Routes - Live matches and standings
app.get("/api/football/live-matches", async (req, res) => {
    try {
        // Try Football-Data.org first (primary)
        let liveMatches = await fetchFromFootballDataAPI(
            "/matches?status=LIVE",
        );

        if (
            !liveMatches ||
            !liveMatches.matches ||
            liveMatches.matches.length === 0
        ) {
            // Fallback to API-Football
            liveMatches = await fetchFromFootballAPI("/fixtures", {
                live: "all",
            });
        }

        if (liveMatches) {
            res.json(liveMatches);
        } else {
            res.status(500).json({ error: "Unable to fetch live matches" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching live matches" });
    }
});

app.get("/api/football/standings/:leagueId", async (req, res) => {
    try {
        const { leagueId } = req.params;
        const { season = "2024" } = req.query;

        // Try Football-Data.org first
        let standings = await fetchFromFootballDataAPI(
            `/competitions/${leagueId}/standings`,
        );

        if (!standings || !standings.standings) {
            // Fallback to API-Football
            standings = await fetchFromFootballAPI("/standings", {
                league: leagueId,
                season: season,
            });
        }

        if (standings) {
            res.json(standings);
        } else {
            res.status(500).json({ error: "Unable to fetch standings" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching standings" });
    }
});

// News API Routes
app.get("/api/news/football", async (req, res) => {
    try {
        const { source = "all", page = 1 } = req.query;

        // Try NewsAPI.org first
        let news = await fetchFromNewsAPI("/everything", {
            q: "(football OR soccer) AND (premier league OR champions league OR la liga OR bundesliga OR serie a OR ligue 1)",
            language: "en",
            sortBy: "publishedAt",
            pageSize: 20,
            page: page,
        });

        if (!news || !news.articles) {
            // Fallback to GNews
            news = await fetchFromGNewsAPI("/search", {
                q: "football Premier League Champions League La Liga Bundesliga Serie A Ligue 1",
                lang: "en",
                country: "us",
                max: 20,
            });
        }

        if (news) {
            if (news.articles) {
                news.articles = news.articles.filter((article) => {
                    const title = article.title?.toLowerCase() || "";
                    const description =
                        article.description?.toLowerCase() || "";
                    const content = article.content?.toLowerCase() || "";

                    const footballTerms = [
                        "football",
                        "soccer",
                        "premier league",
                        "champions league",
                        "la liga",
                        "bundesliga",
                        "serie a",
                        "mls",
                        "world cup",
                        "european championship",
                        "transfer",
                        "fixture",
                        "match",
                        "goal",
                        "striker",
                        "midfielder",
                        "defender",
                        "goalkeeper",
                    ];

                    return footballTerms.some(
                        (term) =>
                            title.includes(term) ||
                            description.includes(term) ||
                            content.includes(term),
                    );
                });
            }
            res.json(news);
        } else {
            res.status(500).json({ error: "Unable to fetch football news" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching football news" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Football News Server running on http://localhost:${PORT}`);
    console.log("Football-Data.org API Integration Ready!");
    console.log("News API Integration Ready!");
    console.log(
        "To use football data and news, set your API keys in config.js",
    );
});
