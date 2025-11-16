# Sweet Shop Management System - Backend

## Overview

The Sweet Shop Management System is a full-stack application designed to manage sweets, allowing users to perform CRUD operations on sweet items. This backend API is built using Node.js and TypeScript, providing a robust and scalable solution for managing sweet-related data.

## Features

- User authentication (register and login)
- CRUD operations for sweets
- API endpoints for managing sweets

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd sweet-shop-kata/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run:

```
npm start
```

The server will be running on `http://localhost:3000`.

### Testing

To run the tests, use:

```
npm test
```

## Project Structure

```
backend
├── src
│   ├── index.js               # Application entry point (server startup, DB connect)
│   ├── app.js                 # Express app configuration & middleware
│   │
│   ├── controllers            # Handles incoming HTTP requests
│   │   ├── authController.js
│   │   └── sweetsController.js
│   │
│   ├── services               # Core business logic
│   │   ├── authService.js
│   │   └── sweetsService.js
│   │
│   ├── models                 # Mongoose models (MongoDB schemas)
│   │   ├── User.js
│   │   └── Sweet.js
│   │
│   ├── routes                 # Route definitions
│   │   ├── authRoutes.js
│   │   ├── sweetsRoutes.js
│   │   └── setupRoutes.js
│   │
│   ├── middleware             # Authentication & error handling middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── config                 # Future configuration files (optional)
│   │   └── db.js (optional)
│   │
│   └── utils                  # Helper functions (optional)
│
├── tests                      # Jest unit tests for controllers/services
│   ├── auth.test.js
│   └── sweets.test.js
│
├── package.json               # Dependencies, scripts, project metadata
├── .env                       # Environment variables (not committed)
└── README.md                  # Backend documentation

```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
