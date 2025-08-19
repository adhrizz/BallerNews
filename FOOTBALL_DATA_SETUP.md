# Football-Data.org API Setup

## Quick Setup for Football-Data.org

### Step 1: Get Your API Key
1. Go to [Football-Data.org](https://www.football-data.org/)
2. Click "Register" or "Sign Up"
3. Create an account with your email
4. Verify your email address
5. Log in and go to your dashboard
6. Copy your API key (it looks like: `1234567890abcdef1234567890abcdef`)

### Step 2: Update Your Config
1. Open `config.js` in your project
2. Replace `'your_football_data_api_key_here'` with your actual API key:

```javascript
footballDataAPI: {
    key: '1234567890abcdef1234567890abcdef', // Your actual API key here
    baseURL: 'https://api.football-data.org/v4'
}
```

### Step 3: Test Your Setup
Run this command to test if your API key works:

```bash
node test-api.js
```

You should see:
```
✅ Football-Data.org is working!
Found X competitions
```

### Step 4: Start Your App
```bash
npm install
npm start
```

Then visit `http://localhost:3000` and test the tabs!

## What You Can Do

### Live Matches Tab
- View real-time match scores
- See match status and venue
- Refresh to get latest data

### Standings Tab
- Select any league (Premier League, La Liga, etc.)
- View current league table
- See team positions and points

### Teams Tab
- Enter team ID to get team info
- View team details, venue, website
- Popular team IDs:
  - **33** - Manchester United
  - **39** - Liverpool
  - **41** - Arsenal
  - **42** - Everton

## API Limits (Free Tier)
- **10 requests per minute**
- Perfect for testing and personal use
- Upgrade available for more requests

## Troubleshooting

### "Error loading live matches"
- Check if your API key is correct in `config.js`
- Make sure you've saved the file
- Restart the server: `npm start`

### "Rate limit exceeded"
- You've used all 10 requests in the last minute
- Wait a minute and try again
- Consider upgrading your plan

### "API key not found"
- Double-check your API key in `config.js`
- Make sure there are no extra spaces
- Restart the server after changing the config

## Popular League IDs
- **2021** - Premier League
- **2014** - La Liga
- **2002** - Bundesliga
- **2019** - Serie A
- **2015** - Ligue 1

## Need Help?
1. Check your API key is correct
2. Restart the server after changing config
3. Try the "Standings" tab instead of "Live Matches"
4. Check the browser console for error messages 