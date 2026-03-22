# Deployment Guide (Split Services)

You cannot deploy this full-stack app in one single field/service. Deploy it as 2 services:
- Backend API: Render
- Frontend React app: Vercel (or Netlify)

## 1) Deploy MongoDB (Atlas)

1. Create a MongoDB Atlas cluster.
2. Create a database user and password.
3. In Network Access, allow your hosting provider IPs (or temporarily `0.0.0.0/0` for setup).
4. Copy your connection string:
   - `mongodb+srv://<user>:<password>@<cluster-url>/portfolio?retryWrites=true&w=majority`

## 2) Deploy Backend on Render

### Option A: Blueprint (recommended)
1. In Render, click New + -> Blueprint.
2. Connect your GitHub repo: `Ekshin683/Portfolio`.
3. Render will detect `render.yaml`.
4. Fill secret env vars when prompted:
   - `MONGO_URI`
   - `SECURITY_KEY`
   - `JWT_SECRET`
   - `CORS_ORIGINS` (set after frontend URL is known, e.g. `https://your-frontend.vercel.app`)

### Option B: Manual Web Service
Use these fields exactly:
- Runtime: `Node`
- Root Directory: `.`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/`

Environment Variables:
- `NODE_ENV=production`
- `PORT=5000`
- `MONGO_URI=<atlas-uri>`
- `SECURITY_KEY=<your-admin-key>`
- `JWT_SECRET=<long-random-secret>`
- `CORS_ORIGINS=https://your-frontend.vercel.app`

After deploy, copy backend URL, for example:
- `https://portfolio-api.onrender.com`

## 3) Deploy Frontend on Vercel

Create a new Vercel project from the same GitHub repo.

Use these fields:
- Framework Preset: `Vite`
- Root Directory: `Front-end`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Environment Variable:
- `VITE_API_URL=https://portfolio-api.onrender.com/api`

Deploy and copy frontend URL, for example:
- `https://portfolio-frontend.vercel.app`

## 4) Final CORS update on Render

Back in Render backend service:
1. Edit env var `CORS_ORIGINS`
2. Set to your real frontend URL:
   - `https://portfolio-frontend.vercel.app`
3. Save and redeploy backend.

## 5) Verify after deploy

1. Backend health check:
   - Open `https://portfolio-api.onrender.com/`
   - Should return JSON: `Portfolio API is running`
2. Frontend:
   - Open Vercel URL and test pages.
3. Admin actions:
   - Add/edit content and upload files.

## Important note about uploads on free hosting

This project stores uploads on local disk (`uploads/`). On many cloud platforms, local filesystem is ephemeral, so uploaded files can be lost on restart/redeploy.

For production reliability, move uploads to cloud storage (Cloudinary, S3, or similar).
