# BallerNews Development Guide

## Build Commands
- `npm start` - Run production server
- `npm run dev` - Run dev server with nodemon
- `npm run build` - Build React bundle with webpack
- `npm run dev:react` - Start React dev server (port 3001)

## Code Style Guidelines
- **Imports**: Group React imports first, then third-party, then local.
- **Components**: Use functional components with hooks and PascalCase naming.
- **Error Handling**: Use try/catch for async operations with console logging.
- **State**: Manage state with `useState` and `useEffect` hooks.
- **API Calls**: Use `fetch` or `axios` with async/await and handle loading states.
- **Styling**: Standard CSS with BEM-style naming conventions in component-specific files.
- **Backend**: Node.js/Express with clear, commented routes and middleware.

## Project Structure
- `/src` - React components and styles
- `/public` - Built assets and `index.html`
- `/server.js` - Express API server with caching and API fetching logic
- `/config.js` - API keys and configuration
- `webpack.config.js` - Webpack configuration for the React app

## Testing
- No formal testing framework is set up.
- API endpoints can be manually tested using `node test-api.js`.
- Key API endpoints include `/api/news/football` and `/api/football/live-matches`.

## Key Libraries
- **React**: Frontend UI library
- **Express**: Backend server framework
- **Axios**: HTTP client for API requests
- **Webpack**: Module bundler for the React application
- **Babel**: JavaScript compiler
- **Nodemon**: Automatic server restarts during development

## Development Workflow
1. Configure API keys in `config.js`.
2. Start the backend server: `npm run dev`
3. Start the frontend dev server: `npm run dev:react`
4. Access the application at `http://localhost:3001`.
