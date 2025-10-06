# BallerNews Development Guide

## Build Commands
- `npm start` - Run production server
- `npm run dev` - Run dev server with nodemon
- `npm run build` - Build React bundle with webpack
- `npm run dev:react` - Start React dev server (port 3001)

## Code Style Guidelines
- **Imports**: Group React imports first, then third-party, then local
- **Components**: Use functional components with hooks, PascalCase naming
- **Error Handling**: Use try/catch with proper error logging
- **State**: Use useState/useEffect hooks, avoid class components
- **API Calls**: Use fetch with async/await, handle loading states
- **Styling**: CSS modules with BEM naming convention

## Project Structure
- `/src` - React components and styles
- `/public` - Built assets and HTML template
- `/server.js` - Express API server
- `/config.js` - API configuration

## Testing
- Server runs on port 3000, React dev on 3001
- API endpoints: `/api/news/football`, `/api/football/live-matches`
- Test API with: `node test-api.js`

## Development Workflow
1. Start backend: `npm run dev`
2. Start frontend: `npm run dev:react`
3. Build for production: `npm run build`

## API Integration
- Configure API keys in `config.js`
- Supports API-Football and Football-Data.org
- Uses caching with node-cache for rate limiting