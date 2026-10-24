# Smart Learning Companion

A complete MERN stack educational platform designed for students, teachers, and administrators.

## Project Overview
Smart Learning Companion is a responsive educational portal where teachers can upload study resources and students can find, search, and access them through a clean UI.

## Features
- Student registration and login
- Teacher registration and login
- Admin dashboard for managing users and materials
- Material upload with metadata and file restrictions
- Search and filter by subject
- JWT-based role-protected routing
- Responsive UI with Bootstrap

## Tech Stack
- Frontend: React.js + Vite + Bootstrap
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- Authentication: JWT + bcryptjs
- File uploads: Multer
- Security: Helmet, CORS, rate limiting

## Folder Structure
```text
smart-learning-companion/
  client/
    src/
      components/
      pages/
      context/
      services/
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    uploads/
  .gitignore
  package.json
  README.md
```

## Installation
1. Install root dependencies:
```bash
npm install
```
2. Install backend dependencies:
```bash
npm run install:server
```
3. Install frontend dependencies:
```bash
npm run install:client
```

## Environment Variables
Create the files:
- `server/.env`
- `client/.env`

Server `.env`:
```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-learning-companion
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

Client `.env`:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run the Project
Start both apps:
```bash
npm run dev
```

Start backend only:
```bash
npm run start --prefix server
```

Start frontend only:
```bash
npm run dev --prefix client
```

## Default API Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/materials`
- `POST /api/materials`
- `GET /api/materials/:id`
- `PUT /api/materials/:id`
- `DELETE /api/materials/:id`
- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `GET /api/admin/materials`

## Notes
- File uploads are stored in the `server/uploads` directory and served from `/uploads`.
- Only allowed document and image types are accepted.
- Role-based authorization protects private resources.
- Passwords are hashed with bcrypt before storing.

## Future Enhancements
- Cloudinary or AWS S3 integration
- Material comments and ratings
- Analytics dashboard for teacher performance
- Advanced filters and PDF preview support
