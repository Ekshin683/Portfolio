# Portfolio API Documentation

## Authentication

All CREATE, UPDATE, and DELETE operations require authentication using JWT token.

### Get JWT Token
**POST** `/api/auth/verify`
- Body: `{ "securityKey": "Ekshin@" }`
- Returns: `{ "token": "jwt_token_here" }`
- Use this token in Authorization header: `Bearer <token>`

---

## 1. Resume API (CV Image Upload)

### Get Resume
**GET** `/api/resume`
- Public access
- Returns the uploaded CV image

### Upload/Update Resume CV
**POST/PUT** `/api/resume`
- **Requires Authentication** (JWT Token)
- Content-Type: `multipart/form-data`
- Fields:
  - `cvImage` (file, required) - Image of your CV/Resume
  - `title` (string, optional) - Default: "My Resume"

### Delete Resume
**DELETE** `/api/resume`
- **Requires Authentication**
- Deletes the CV image and record

---

## 2. Projects API

### Get All Projects
**GET** `/api/projects`
- Public access

### Get Single Project
**GET** `/api/projects/:id`
- Public access

### Create Project
**POST** `/api/projects`
- **Requires Authentication**
- Content-Type: `multipart/form-data`
- Fields:
  - `title` (string, required)
  - `description` (string, required)
  - `technologies` (string, required) - Comma-separated
  - `image` (file, optional)
  - `liveLink` (string, optional)
  - `githubLink` (string, optional)
  - `category` (string) - Options: 'web', 'mobile', 'desktop', 'other'
  - `featured` (boolean)

### Update Project
**PUT** `/api/projects/:id`
- **Requires Authentication**
- Same fields as Create

### Delete Project
**DELETE** `/api/projects/:id`
- **Requires Authentication**

---

## 3. Education API

### Get All Education
**GET** `/api/education`
- Public access

### Get Single Education
**GET** `/api/education/:id`
- Public access

### Create Education
**POST** `/api/education`
- **Requires Authentication**
- Content-Type: `multipart/form-data`
- Fields:
  - `institution` (string, required)
  - `degree` (string, required)
  - `field` (string, required)
  - `startDate` (date, required)
  - `endDate` (date, optional)
  - `currentlyStudying` (boolean)
  - `grade` (string, optional)
  - `description` (string, optional)
  - `logo` (file, optional) - Institution logo
  - `order` (number) - Display order

### Update Education
**PUT** `/api/education/:id`
- **Requires Authentication**
- Same fields as Create

### Delete Education
**DELETE** `/api/education/:id`
- **Requires Authentication**

---

## 4. Achievements API

### Get All Achievements
**GET** `/api/achievements`
- Public access

### Get Single Achievement
**GET** `/api/achievements/:id`
- Public access

### Create Achievement
**POST** `/api/achievements`
- **Requires Authentication**
- Content-Type: `multipart/form-data`
- Fields:
  - `title` (string, required)
  - `description` (string, required)
  - `date` (date, required)
  - `category` (string) - Options: 'award', 'certification', 'competition', 'publication', 'other'
  - `organization` (string, optional)
  - `image` (file, optional) - Certificate/Award image
  - `certificateLink` (string, optional)
  - `order` (number) - Display order

### Update Achievement
**PUT** `/api/achievements/:id`
- **Requires Authentication**
- Same fields as Create

### Delete Achievement
**DELETE** `/api/achievements/:id`
- **Requires Authentication**

---

## 5. Skills API

### Get All Skills
**GET** `/api/skills`
- Public access

### Get Skills by Category
**GET** `/api/skills/category/:category`
- Public access
- Categories: 'frontend', 'backend', 'database', 'tools', 'soft-skills', 'other'

### Get Single Skill
**GET** `/api/skills/:id`
- Public access

### Create Skill
**POST** `/api/skills`
- **Requires Authentication**
- Content-Type: `multipart/form-data`
- Fields:
  - `name` (string, required)
  - `category` (string, required) - Options: 'frontend', 'backend', 'database', 'tools', 'soft-skills', 'other'
  - `icon` (file, optional) - Skill icon/logo
  - `order` (number) - Display order

### Update Skill
**PUT** `/api/skills/:id`
### Delete Skill
**DELETE** `/api/skills/:id`

---

## 6. Home API

### Get Home Content
**GET** `/api/home`
- Public access

### Create/Update Home Content
**POST/PUT** `/api/home`
- **Requires Authentication**
- Content-Type: `multipart/form-data`
- Fields:
  - `name` (string, required)
  - `tagline` (string, required)
  - `description` (string, required)
  - `profileImage` (file, optional)

### Delete Home Content
**DELETE** `/api/home`
- **Requires Authentication**

---

## Summary

### All Sections Support:
✅ **Create** - Add new items (with authentication)
✅ **Read** - View items (public access)
✅ **Update** - Edit existing items (with authentication)
✅ **Delete** - Remove items (with authentication)
✅ **Image Upload** - Upload relevant images for each section

### Authentication Required For:
- All POST (Create) operations
- All PUT (Update) operations
- All DELETE operations

### Public Access:
- All GET (Read) operations

### Security Key:
- `Ekshin@` - Use this to get JWT token from `/api/auth/verify`
