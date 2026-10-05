# LearnHub — Learning Management System

**Learn, Practice, Grow.**

LearnHub is a full-stack Learning Management System (LMS) built with **React, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication**.

The platform allows users to register and log in, explore courses, enroll in courses, access lessons, track learning progress, take quizzes, and view their learning information through a personalized dashboard.

---

## 🚀 Features

### 👤 Authentication
- User registration and login
- JWT-based authentication
- Protected backend routes
- Persistent login using local storage
- Logout functionality

### 📚 Course Management
- Browse available courses
- Search courses
- Filter courses by category
- View detailed course information
- Course enrollment
- Prevention of duplicate enrollment

### 🎓 Learning
- Access enrolled courses
- Course-specific lessons
- Lesson progress tracking
- Persistent learning progress
- Quiz functionality
- Quiz result and score display

### 📊 User Dashboard
- Personalized dashboard
- Enrolled course information
- Learning overview
- Profile information
- Account and settings pages

### 🎨 UI & UX
- Responsive design
- Mobile-friendly navigation
- Tailwind CSS styling
- Reusable React components
- Clean and consistent interface

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- JWT
- Mongoose

### Database
- MongoDB Atlas

### Development Tools
- VS Code
- Git & GitHub
- Chrome DevTools

---

## 🏗️ Architecture

LearnHub follows a client-server architecture:

```text
┌─────────────────────┐
│   React Frontend    │
│                     │
│ Components / Pages  │
│ React Router        │
│ Axios API Calls     │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│   Express Backend   │
│                     │
│ API Routes          │
│ JWT Authentication  │
│ Middleware          │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│    MongoDB Atlas    │
│                     │
│ Users               │
│ Enrollments         │
└─────────────────────┘
```

The frontend is responsible for the user interface and user interactions, while the backend handles authentication, protected operations, and communication with MongoDB.

---

## 🔐 Authentication Flow

LearnHub uses **JSON Web Tokens (JWT)** for authentication.

The basic authentication flow is:

```text
User Login
    ↓
React Frontend
    ↓
POST /api/auth/login
    ↓
Express Backend
    ↓
Credentials Verified
    ↓
JWT Token Generated
    ↓
Token Returned to Frontend
    ↓
Token Stored in Local Storage
    ↓
Token Sent with Protected Requests
    ↓
JWT Middleware Verifies Token
    ↓
Protected Resource Accessed
```

Protected operations such as profile and enrollment requests require a valid JWT token.

---

## 🔗 Frontend ↔ Backend Integration

The React frontend communicates with the Express backend through HTTP API requests.

For example:

```text
React
  ↓
Axios Request
  ↓
Express API
  ↓
JWT Middleware
  ↓
MongoDB
  ↓
Response
  ↓
React UI
```

This separation allows the frontend and backend to have different responsibilities while communicating through APIs.

---

## 📁 Project Structure

```text
learnhub/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Enrollment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── enrollmentRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   └── pages/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd learnhub
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside `frontend` if your frontend configuration requires environment variables.

**Do not commit `.env` files to GitHub.**

---

## ▶️ Running the Application

### Start the backend

From the `backend` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🔑 Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Enrollments

```text
POST /api/enrollments
GET  /api/enrollments
```

Protected routes require a valid JWT token.

---

## 🗄️ Database

LearnHub uses **MongoDB Atlas** as its database.

The main collections/models include:

### User

Stores user account information used for authentication and profile functionality.

### Enrollment

Stores the relationship between a user and the courses they have enrolled in.

Mongoose is used in the backend to define schemas and communicate with MongoDB.

---

## 🔒 Security

Sensitive configuration is stored in environment variables rather than source code.

The repository ignores:

```text
.env
.env.*
node_modules/
dist/
.vscode/
```

This prevents credentials and unnecessary generated files from being committed to the repository.

---

## 📈 Future Improvements

Possible future enhancements include:

- Admin dashboard
- Course creation and management
- Instructor accounts
- Payment integration
- Certificate generation
- More advanced progress analytics
- Cloud deployment
- Password reset functionality
- Email verification

---

## 👩‍💻 Author

**Moina Khan**

LearnHub was developed as a full-stack learning project to practice and demonstrate skills in modern frontend development, backend API development, authentication, database integration, and application architecture.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.