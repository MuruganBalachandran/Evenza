# Evenza

Event management platform built with React and Node.js.

## Project Structure

- `/frontend`: React frontend built with Vite
- `/backend`: Node.js/Express backend with MongoDB

## Deployment Instructions

### Backend Deployment (Render)

1. Push your repository to GitHub
2. Sign up or log in to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure as follows:
   - **Name**: evenza-api (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: backend
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Leave blank (Render sets this automatically)
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL (after deployment)
7. Deploy

### Frontend Deployment (Vercel)

1. Push your repository to GitHub
2. Sign up or log in to [Vercel](https://vercel.com)
3. Create a new Project
4. Import your GitHub repository
5. Configure as follows:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
6. Add environment variables (from your `.env` file):
   - `VITE_API_URL`: Your Render backend URL + /api (e.g., https://evenza-api.onrender.com/api)
   - All Firebase config variables
7. Deploy

## Development Setup

1. Clone the repository
2. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the values
3. Install dependencies:
   ```
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```
4. Start development servers:
   ```
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)