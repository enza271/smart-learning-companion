# Smart Learning Companion

A complete MERN stack educational platform for students, teachers, and administrators.

## Features
- Teacher authentication and dashboard
- Student dashboard with subject filtering and search
- Admin dashboard to manage users and materials
- JWT-based auth and role-based access control
- Material upload with metadata and file validation
- Responsive Bootstrap UI

## Tech Stack
- Frontend: React + Vite + Bootstrap
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- Authentication: JWT + bcryptjs
- File upload: Multer

## Project Structure

```text
smart-learning-companion/
  client/
    src/
  server/
    src/
  .gitignore
  README.md
  package.json
```

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB Atlas cluster

## Installation

1. Clone the repository
2. Install root dependencies
   ```bash
   npm install
   ```
3. Install backend dependencies
   ```bash
   npm run install:server
   ```
4. Install frontend dependencies
   ```bash
   npm run install:client
   ```
5. Configure environment files:
   - `server/.env.example` → rename to `.env`
   - `client/.env.example` → rename to `.env`

## Environment Variables

Server:
```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-learning-companion
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
```

Client:
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the App

Start both frontend and backend:
```bash
npm run dev
```

Run backend only:
```bash
npm run start --prefix server
```

Run frontend only:
```bash
npm run dev --prefix client
```

## Default User Roles
- Student
- Teacher
- Admin

## API Endpoints

Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

Materials
- GET `/api/materials`
- GET `/api/materials/:id`
- POST `/api/materials`
- PUT `/api/materials/:id`
- DELETE `/api/materials/:id`

Admin
- GET `/api/admin/dashboard`
- GET `/api/admin/users`
- GET `/api/admin/materials`
- DELETE `/api/admin/materials/:id`

## Notes
- Passwords are stored as secure bcrypt hashes.
- File uploads are restricted by extension and size.
- Teacher access is limited to their own uploaded materials unless acting as admin.

## Future Improvements
- Cloudinary or AWS S3 integration for file hosting
- Dashboard analytics and charts
- Bulk material import
- Email notifications and course reminders
- Advanced search with filters
