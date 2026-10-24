# Smart Learning Companion

A simplified MERN stack project for students and teachers.

## Features
- Student registration and login
- Teacher registration and login
- Admin role access
- Material upload and listing
- Search and filter by subject
- MongoDB Atlas + Mongoose
- JWT authentication
- Bootstrap responsive UI

## Stack
- Frontend: React + Vite + Bootstrap
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- Auth: JWT + bcryptjs
- File upload: Multer

## Folder structure
```text
smart-learning-companion/
  client/
    src/
  server/
    src/
    uploads/
  package.json
  README.md
```

## Install
```bash
npm install
npm run install:server
npm run install:client
```

## Environment variables
Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-learning-companion
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run
```bash
npm run dev
```

Then open:
- http://localhost:5173
- http://localhost:5000/api/health

## Roles
- Student: browse materials
- Teacher: upload and manage their materials
- Admin: view users and materials

## Notes
This is a simplified submission-ready MVP version designed for easy setup and demonstration.
