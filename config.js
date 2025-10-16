    // Football API Configuration
// Get your API key from: https://www.football-data.org/
// Free tier: 10 requests per minute

const config = {
    // Football-Data.org configuration (Primary - Free tier available)
    footballDataAPI: {
        key: process.env.FOOTBALL_DATA_API_KEY || 'b1e4a221229e42c9b0fbe7c50be054f7',
        baseURL: 'https://api.football-data.org/v4'
    },
    
    // API-Football configuration (Backup)
    footballAPI: {
        key: process.env.FOOTBALL_API_KEY || 'your_api_key_here',
        host: process.env.FOOTBALL_API_HOST || 'v3.football.api-sports.io',
        baseURL: 'https://v3.football.api-sports.io'
    },
    
    // News API configuration
    newsAPI: {
        key: process.env.NEWS_API_KEY || '0f58d298f6714839aa5ba099e79946c6',
        baseURL: 'https://newsapi.org/v2'
    },
    
    // GNews API configuration (Alternative)
    gNewsAPI: {
        key: process.env.GNEWS_API_KEY || 'your_gnews_api_key_here',
        baseURL: 'https://gnews.io/api/v4'
    },
    
    // Server configuration
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'YOUR_MONGO_URI_HERE',
    jwtSecret: process.env.JWT_SECRET || 'YOUR_JWT_SECRET_HERE'
};

module.exports = config; 
