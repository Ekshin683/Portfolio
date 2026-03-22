# Professional Portfolio Website

A fully animated, glassmorphic portfolio website with an admin panel for managing content.

## Features

- **Modern Design**: Glass morphism UI with smooth animations
- **Secure Admin Panel**: Security key-based authentication for content management
- **Full CRUD Operations**: Add, edit, and delete projects, education, achievements, and skills
- **File Upload**: Support for images and documents
- **Responsive**: Works on all devices
- **No User System**: Simple admin-only access via security key

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- CORS enabled

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- Axios
- Vite (build tool)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the root directory:
   ```bash
   cd Portfolio-1
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/portfolio
   SECURITY_KEY=your_secure_admin_key_here
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start MongoDB:
   ```bash
   mongod
   ```

5. Run the backend:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the Front-end directory:
   ```bash
   cd Front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`

## Usage

### Public Access
- View Home, Projects, Resume, Education, Achievements, and Skills pages
- Browse all public content

### Admin Access
1. Click "Add" button on any page
2. Enter your security key when prompted
3. Add, edit, or delete content
4. Upload images and files through the file manager

### Security Key
- Default key is set in `.env` file
- Change `SECURITY_KEY` in `.env` to your preferred key
- Keep it secure!

## API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify security key and get token

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Education
- `GET /api/education` - Get all education
- `POST /api/education` - Create education (auth required)
- `PUT /api/education/:id` - Update education (auth required)
- `DELETE /api/education/:id` - Delete education (auth required)

### Achievements
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements` - Create achievement (auth required)
- `PUT /api/achievements/:id` - Update achievement (auth required)
- `DELETE /api/achievements/:id` - Delete achievement (auth required)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create skill (auth required)
- `PUT /api/skills/:id` - Update skill (auth required)
- `DELETE /api/skills/:id` - Delete skill (auth required)

### Resume
- `GET /api/resume` - Get resume
- `POST /api/resume` - Create/update resume (auth required)
- `DELETE /api/resume` - Delete resume (auth required)

## File Uploads

Uploaded files are stored in:
- `uploads/images/` - Images (projects, achievements, logos, etc.)
- `uploads/documents/` - Documents (resumes, certificates)
- `uploads/files/` - Other files

## Development

### Backend Development
```bash
npm run dev
```
Uses nodemon for auto-restart

### Frontend Development
```bash
cd Front-end
npm run dev
```
Uses Vite with hot module replacement

### Build for Production
```bash
cd Front-end
npm run build
```

## Deployment

This project should be deployed as two services (not one field/service):
- Backend API (Render)
- Frontend app (Vercel)

See the full step-by-step guide in `DEPLOYMENT.md`.

## Customization

### Change Theme Colors
Edit `Front-end/src/index.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Add New Sections
1. Create model in `models/`
2. Create controller in `controllers/`
3. Create routes in `routes/`
4. Add to `server.js`
5. Create React page in `Front-end/src/pages/`
6. Add route in `App.jsx`

## License

MIT

## Author

Your Name
