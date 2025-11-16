# Sweet Shop Management System

## Overview

The Sweet Shop Management System is a full-stack application designed to manage sweets, allowing users to perform CRUD operations on sweet items. The project is structured into a backend API and a frontend application, both built using Node.js and TypeScript.

## 📸 Screenshots

### 🔹 Login Page

![Login Page](frontend/assets/login.png)

### 🔹 Register Page

![Register Page](frontend/assets/register.png)

### 🔹 Admin Dashboard

![Admin Dashboard](frontend/assets/admin.png)

### 🔹 Add Sweet Form

![Add Sweet Form](frontend/assets/sweetAdd.png)

### 🔹 User Dashboard

![User Dashboard](frontend/assets/user.png)

## Project Structure

```
sweet-shop-kata
├── backend
│   ├── src
│   │   ├── index.js                # Server entry, DB connection, starts app
│   │   ├── app.js                  # Express app, middleware, routes
│   │   │
│   │   ├── controllers             # Handles request/responses
│   │   │   ├── authController.js
│   │   │   └── sweetsController.js
│   │   │
│   │   ├── services                # Business logic / DB operations
│   │   │   ├── authService.js
│   │   │   └── sweetsService.js
│   │   │
│   │   ├── models                  # Mongoose Models (MongoDB)
│   │   │   ├── User.js
│   │   │   └── Sweet.js
│   │   │
│   │   ├── middleware              # Security and error handling
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── routes                  # API Endpoints
│   │   │   ├── authRoutes.js
│   │   │   ├── sweetsRoutes.js
│   │   │   └── setupRoutes.js
│   │   │
│   │   └── config                  # Optional: DB config or env loaders
│   │       └── db.js (optional)
│   │
│   ├── tests                       # Jest tests
│   │   ├── auth.test.js
│   │   └── sweets.test.js
│   │
│   ├── package.json                # Backend deps + scripts
│   ├── .env                        # Backend environment variables
│   ├── README.md                   # Backend documentation
│   └── tsconfig.json (optional if backend uses TS)
│
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   │
│   │   ├── api                     # Axios setup
│   │   │   └── api.js
│   │   │
│   │   ├── pages                   # Views
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   │
│   │   ├── components              # Reusable UI components
│   │   │   ├── AddSweetForm.jsx
│   │   │   ├── SweetsList.jsx
│   │   │   └── SweetItem.jsx
│   │   │
│   │   ├── styles                  # CSS files
│   │   │   ├── AuthPage.css
│   │   │   ├── Dashboard.css
│   │   │   └── AddSweetForm.css
│   │   │
│   │   └── assets                  # Images/icons
│   │
│   ├── tests                       # React component tests (optional)
│   ├── package.json                # Frontend deps + scripts
│   ├── vite.config.js              # Vite config
│   ├── .env                        # Frontend API URL: VITE_API_URL=http://localhost:3001/api
│   └── README.md                   # Frontend docs
│
│
├── package.json                    # Root workspace config (optional)
├── tsconfig.json                   # Root TS config (optional)
├── .gitignore
└── README.md                       # Full project documentation

```

## Backend

The backend is built using Express and TypeScript. It provides RESTful API endpoints for managing sweets.

### Key Files

- **index.js**: Entry point for the backend application.
- **app.jss**: Sets up middleware, routes, and error handling.
- **controllers/sweetsController.js**: Handles API requests related to sweets.
- **services/sweetsService.js**: Contains business logic for managing sweets.
- **models/sweet.js**: Defines the structure of a sweet object.
- **routes/index.js**: Sets up API routes.
- **types/index.js**: TypeScript interfaces for request and response types.
- **tests/sweets.spec.jss**: Unit tests for the SweetsController and SweetsService.

## Frontend

The frontend is a single-page application (SPA) built with React and TypeScript. It interacts with the backend API to display and manage sweets.

### Key Files

- **src/index.jsx**: Entry point for the frontend application.
- **src/App.jsx**: Main application component.
- **src/components/SweetList.jsx**: Displays a list of sweets.
- **src/pages/Home.jsx**: Main page of the application.
- **src/types/index.jsx**: TypeScript interfaces for frontend types.
- **tests/App.spec.jsx**: Unit tests for the App component.

## Setup Instructions

1. Clone the repository.
2. Navigate to the `backend` directory and run `npm install` to install backend dependencies.
3. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
4. Start the backend server by running `npm start` in the `backend` directory.
5. Start the frontend application by running `npm start` in the `frontend` directory.

## Objectives

- Implement a robust backend API for managing sweets.
- Create a user-friendly frontend application to interact with the API.
- Ensure code quality through unit testing and adherence to TypeScript standards.

## License

This project is licensed under the MIT License.
