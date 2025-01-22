# Todo List REST API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing todo items with user authentication and automated task status updates.

## Features

- 🔐 User Authentication (JWT)
- ✨ CRUD Operations for Todo Items
- 🕒 Automatic Todo Status Updates (CRON Job)
- 📝 TypeScript Support
- 🗄️ MongoDB Database
- 🔄 RESTful API Design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Project Structure

```
todo-api/
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
├── src/
│   ├── types/
│   │   └── index.ts           # Type definitions
│   ├── models/
│   │   ├── user.model.ts      # User model
│   │   └── todo.model.ts      # Todo model
│   ├── middleware/
│   │   └── auth.middleware.ts # Auth middleware
│   ├── controllers/
│   │   ├── auth.controller.ts # Auth controller
│   │   └── todo.controller.ts # Todo controller
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth routes
│   │   └── todo.routes.ts     # Todo routes
│   ├── jobs/
│   │   └── updateExpiredTodos.ts  # CRON job
│   ├── config/
│   │   └── database.ts        # DB config
│   └── app.ts                 # Main app file
├── dist/                      # Compiled files
├── tests/                     # Test files
└── node_modules/              # Dependencies
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-secret-key
```

4. Build the project:
```bash
npm run build
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication

#### Register a new user
```http
POST /api/auth/signup
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### Todos (Protected Routes - Require Authentication)

#### Create a new todo
```http
POST /api/todos
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "title": "Complete project",
    "description": "Finish the todo API project",
    "dueDate": "2024-12-31T23:59:59.999Z"
}
```

#### Get all todos
```http
GET /api/todos
Authorization: Bearer <jwt_token>
```

#### Get a specific todo
```http
GET /api/todos/:id
Authorization: Bearer <jwt_token>
```

#### Update a todo
```http
PATCH /api/todos/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "completed": true
}
```

#### Delete a todo
```http
DELETE /api/todos/:id
Authorization: Bearer <jwt_token>
```

## CRON Job

The application includes a CRON job that runs daily at midnight to automatically mark expired todos as completed. This is configured in `src/jobs/updateExpiredTodos.ts`.

## Development

### Available Scripts

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the TypeScript code
- `npm start`: Run the compiled code in production
- `npm test`: Run the test suite

### Adding New Features

1. Create any necessary types in `src/types/index.ts`
2. Add new models in `src/models/`
3. Create controllers in `src/controllers/`
4. Define routes in `src/routes/`
5. Update tests accordingly



## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled
- Request body size is limited
- Environment variables are used for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
