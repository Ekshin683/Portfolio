# Portfolio Website - Quick Setup Guide

## Prerequisites
Before starting, ensure you have:
- [x] Node.js installed (v16 or higher) - Download from https://nodejs.org
- [ ] MongoDB installed (or MongoDB Atlas account) - Download from https://www.mongodb.com/try/download/community

## Step 1: Configure Environment Variables

### Backend Configuration
Edit the file `.env` in the root folder and update these values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
SECURITY_KEY=your_secure_admin_key_here    # CHANGE THIS!
JWT_SECRET=your_jwt_secret_key_here         # CHANGE THIS!
```

**IMPORTANT:** Change `SECURITY_KEY` to your own secret key. This is what you'll use to access admin features.

## Step 2: Start MongoDB

If using local MongoDB:
```bash
mongod
```

Or use MongoDB Compass or MongoDB Atlas (cloud).

## Step 3: Start the Application

### Option A: Use the Startup Script (Easiest)
Double-click `start.bat` (Windows) or run `start.ps1` in PowerShell.

This will automatically start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Front-end
npm run dev
```

## Step 4: Access Your Portfolio

1. Open browser: http://localhost:3000
2. You'll see your professional portfolio homepage
3. Navigate through different sections

## Step 5: Add Content (Admin Access)

1. Click on any "Add" button (e.g., "Add Project")
2. Enter your security key (the one you set in `.env`)
3. Fill in the form
4. Upload images/files using the file picker
5. Click "Add" or "Update" to save

## Security Key Usage

Your security key is required to:
- Add new projects, education, achievements, skills
- Edit existing content
- Delete content
- Update resume

**Where to enter it:**
When you click "Add" on any page, a modal will appear asking for your security key.

## Customization

### Change Theme Colors
Edit `Front-end/src/index.css`:
```css
:root {
    --primary-color: #667eea;      /* Main color */
    --secondary-color: #764ba2;    /* Secondary color */
    --accent-color: #f093fb;       /* Accent color */
}
```

### Change Gradient Background
Edit `Front-end/src/index.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running (`mongod`)
- Check if port 5000 is available
- Verify `.env` file exists with correct values

### Frontend won't start
- Make sure port 3000 is available
- Check if dependencies are installed: `cd Front-end && npm install`
- Verify backend is running

### Can't upload files
- Check if `uploads/` folder exists (it's created automatically)
- Verify file size is under 5MB
- Check file format matches allowed types

### Security key not working
- Verify `SECURITY_KEY` in `.env` matches what you're typing
- Check for extra spaces
- Case-sensitive!

## File Structure

```
Portfolio-1/
├── config/           # Database configuration
├── models/           # MongoDB schemas
├── controllers/      # Business logic
├── routes/           # API routes
├── auth/             # Authentication middleware
├── uploads/          # Uploaded files (auto-created)
│   ├── images/
│   ├── documents/
│   └── files/
├── Front-end/        # React application
│   ├── src/
│   │   ├── components/  # Navbar, SecurityModal
│   │   ├── pages/       # All page components
│   │   ├── context/     # Auth context
│   │   └── services/    # API services
│   └── public/
├── server.js         # Main backend entry
├── .env              # Environment variables
└── README.md         # Documentation
```

## Next Steps

1. Start MongoDB
2. Run `start.bat` or manually start backend and frontend
3. Open http://localhost:3000
4. Click "Add Project" and enter your security key
5. Start adding your content!

## Production Deployment

When ready to deploy:

1. Build frontend: `cd Front-end && npm run build`
2. The `dist` folder will contain production-ready files
3. Deploy backend to Heroku/Vercel/DigitalOcean
4. Deploy frontend to Vercel/Netlify
5. Update environment variables on hosting platforms

## Need Help?

Check out the main README.md for detailed API documentation and advanced features.

---

**Remember:** Keep your security key safe and never commit the `.env` file to Git!
