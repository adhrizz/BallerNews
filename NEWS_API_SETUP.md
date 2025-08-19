# Football News API Setup

Get football news like 433, Goal, ESPN, Sky Sports, and more!

## News API Options

### **Option 1: NewsAPI.org (Recommended - Free)**
- **100 requests per day** (free tier)
- **No credit card required**
- **Good football news coverage**
- **Sources: ESPN, Sky Sports, BBC, Goal, etc.**

### **Option 2: GNews API (Alternative)**
- **100 requests per day** (free tier)
- **Good sports coverage**
- **Multiple news sources**

## Setup Instructions

### Step 1: Get NewsAPI.org Key (Recommended)

1. **Sign up at NewsAPI.org**
   - Go to [NewsAPI.org](https://newsapi.org/)
   - Click "Get API Key"
   - Create an account with your email
   - Verify your email

2. **Get your API key**
   - Log in to your dashboard
   - Copy your API key (looks like: `1234567890abcdef1234567890abcdef`)

3. **Update config.js**
   ```javascript
   newsAPI: {
       key: 'your_actual_news_api_key_here',
       baseURL: 'https://newsapi.org/v2'
   }
   ```

### Step 2: Get GNews API Key (Optional Backup)

1. **Sign up at GNews**
   - Go to [GNews.io](https://gnews.io/)
   - Click "Get API Key"
   - Create an account

2. **Update config.js**
   ```javascript
   gNewsAPI: {
       key: 'your_actual_gnews_api_key_here',
       baseURL: 'https://gnews.io/api/v4'
   }
   ```

## What You Get

### **News Sources Included:**
- **ESPN** - Sports news and analysis
- **Sky Sports** - Premier League coverage
- **BBC Sport** - UK football news
- **Goal.com** - Transfer news and updates
- **The Athletic** - In-depth football coverage
- **ESPN FC** - Football-specific content
- **And many more!**

### **News Types Available:**
1. **General Football News** - Latest football updates
2. **Transfer News** - Player transfers and rumors
3. **Team-Specific News** - News about specific teams

## How to Use

### **In Your App:**
1. Go to the "News" tab
2. Select news type:
   - **General Football** - All football news
   - **Transfer News** - Transfer rumors and deals
   - **Team Specific** - News about a particular team
3. Enter team name (for team-specific news)
4. Click "Load News"

### **API Endpoints:**
- `GET /api/news/football` - General football news
- `GET /api/news/transfer` - Transfer news
- `GET /api/news/team/:teamName` - Team-specific news

## News Sources You'll Get

### **Major Football News Sources:**
- **433** - Football content and highlights
- **Goal.com** - Transfer news and match reports
- **ESPN** - Sports coverage and analysis
- **Sky Sports** - Premier League and European football
- **BBC Sport** - UK football news
- **The Athletic** - In-depth football journalism
- **ESPN FC** - Football-specific content
- **Football365** - Football news and opinion
- **Squawka** - Football statistics and news
- **90min** - Football news and features

## API Limits

### **NewsAPI.org Free Tier:**
- **100 requests per day**
- Perfect for testing and personal use
- Upgrade available for more requests

### **GNews Free Tier:**
- **100 requests per day**
- Good backup option
- Multiple news sources

## Testing Your Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update your API keys in config.js**

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Test the news:**
   - Go to `http://localhost:3000`
   - Click "News" tab
   - Select "General Football"
   - Click "Load News"

## Troubleshooting

### **"Error loading news"**
- Check if your API key is correct in `config.js`
- Make sure you've saved the file
- Restart the server after changing config

### **"Rate limit exceeded"**
- You've used all 100 requests for the day
- Wait until tomorrow or upgrade your plan

### **"No news found"**
- Try different search terms
- Check if your API key is working
- Try the backup API (GNews)

## Popular Team Names to Try

- **Manchester United**
- **Liverpool**
- **Arsenal**
- **Chelsea**
- **Real Madrid**
- **Barcelona**
- **Bayern Munich**
- **PSG**

## News Categories Available

1. **General Football** - All football news
2. **Transfer News** - Player transfers and rumors
3. **Team News** - Specific team updates
4. **Match Reports** - Game analysis
5. **Transfer Rumors** - Transfer speculation

Your app now has professional football news from major sources like 433, Goal, ESPN, and more! 