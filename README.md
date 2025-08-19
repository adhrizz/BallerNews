# Football Updates App

A modern web application for managing and displaying football updates, news, and live match data with API integration.

## Features

- ✨ Modern, responsive design
- 📱 Mobile-friendly interface
- 🎨 Beautiful gradient UI
- ➕ Add new football updates
- 🗑️ Delete existing updates
- 📊 Categorized updates (Premier League, Champions League, etc.)
- ⚡ Real-time updates with JavaScript
- 🔥 **NEW: Live match data integration**
- 📈 **NEW: League standings**
- 🏆 **NEW: Team information**
- 🌐 **NEW: Multiple football API support**

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **APIs**: API-Football, Football-Data.org integration

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Football API** (Optional)
   - Get API key from [API-Football](https://www.api-football.com/) (recommended)
   - Or get free API key from [Football-Data.org](https://www.football-data.org/)
   - Update `config.js` with your API keys

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Configuration

### Option 1: API-Football (Recommended)
1. Sign up at [API-Football](https://www.api-football.com/)
2. Get your API key
3. Update `config.js`:
   ```javascript
   footballAPI: {
       key: 'your_api_key_here',
       host: 'v3.football.api-sports.io',
       baseURL: 'https://v3.football.api-sports.io'
   }
   ```

### Option 2: Football-Data.org (Free Tier)
1. Sign up at [Football-Data.org](https://www.football-data.org/)
2. Get your free API key
3. Update `config.js`:
   ```javascript
   footballDataAPI: {
       key: 'your_football_data_api_key_here',
       baseURL: 'https://api.football-data.org/v4'
   }
   ```

## API Endpoints

### Local Updates
- `GET /api/updates` - Get all football updates
- `POST /api/updates` - Add a new update
- `DELETE /api/updates/:id` - Delete an update by ID

### Football API Integration
- `GET /api/football/live-matches` - Get live matches
- `GET /api/football/standings/:leagueId` - Get league standings
- `GET /api/football/teams/:teamId` - Get team information
- `GET /api/football/leagues` - Get available leagues
- `GET /api/football/matches/:teamId` - Get team matches

## Usage

### Updates Tab
1. **View Updates**: All football updates are displayed on the main page
2. **Add Update**: Use the form at the top to add new updates
   - Enter a title
   - Select a category
   - Write the content
3. **Delete Update**: Click the "Delete" button on any update card

### Live Matches Tab
- View real-time match data
- Click "Refresh Live Matches" to get latest data
- Shows match scores, teams, and venue information

### Standings Tab
- Select a league from the dropdown
- Choose the season
- Click "Load Standings" to view league table
- Shows position, team name, matches played, wins, draws, losses, and points

### Teams Tab
- Enter a team ID (e.g., 33 for Manchester United)
- Click "Load Team Info" to view team details
- Shows team name, country, founded year, venue, and city

## Popular Team IDs

- **33** - Manchester United
- **34** - Newcastle United
- **35** - Bournemouth
- **36** - Fulham
- **39** - Liverpool
- **40** - Southampton
- **41** - Arsenal
- **42** - Everton
- **43** - Brighton & Hove Albion
- **44** - Leicester City

## Popular League IDs

- **39** - Premier League
- **140** - La Liga
- **78** - Bundesliga
- **135** - Serie A
- **61** - Ligue 1

## Sample Data

The app comes with sample football updates including:
- Premier League match results
- Champions League updates
- Transfer news

## Project Structure

```
football-updates-app/
├── server.js          # Express server with API integration
├── config.js          # API configuration
├── package.json       # Dependencies
├── README.md         # This file
└── public/
    └── index.html    # Frontend application with tabs
```

## Customization

You can easily customize the app by:
- Adding new categories in the HTML select options
- Modifying the CSS styles in the `<style>` section
- Extending the API endpoints in `server.js`
- Adding more football APIs in `config.js`

## Troubleshooting

### API Issues
- Make sure your API key is correctly set in `config.js`
- Check if you've exceeded your API rate limits
- Verify the API service is working

### Common Errors
- "Cannot find express" - Run `npm install`
- "API key not found" - Update `config.js` with your API key
- "Rate limit exceeded" - Wait and try again, or upgrade your API plan

## License

MIT License - feel free to use this project for your own purposes! 