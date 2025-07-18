# Restaurant Management System Backend

A Node.js and Express-based backend for managing restaurant staff (persons) and menu items, with authentication and CRUD operations. Data is stored in MongoDB using Mongoose.

## Features
- User authentication with JWT and Passport Local Strategy
- Secure password hashing with bcrypt
- CRUD operations for persons (staff) and menu items
- Staff roles: chef, manager, waiter
- Menu item taste categories: spicy, sour, sweet, bitter
- Request logging middleware

## Installation

1. Clone the repository and navigate to this directory:
   ```bash
   git clone <repo-url>
   cd 1-first-step
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in this directory with:
     ```env
     JWT_SECRET=your_jwt_secret
     ```
   - Adjust values as needed.
4. Start the server:
   ```bash
   node server.js
   ```
   The server runs on port 3000 by default.

## Usage

- Most `/person` endpoints require a valid JWT token in the `Authorization` header (except signup and login).
- Example header: `Authorization: Bearer <token>`
- The root endpoint `/` is protected by Passport Local authentication.

## API Endpoints

### Person Endpoints (`/person`)

- `POST /person/signup` — Register a new person (staff member). Returns created person and JWT token.
- `POST /person/login` — Login with username and password. Returns JWT token.
- `GET /person/` — Get all persons (requires JWT).
- `GET /person/:workType` — Get persons by work type (`chef`, `manager`, `waiter`).
- `PUT /person/:id` — Update a person by ID (requires JWT).
- `DELETE /person/:id` — Delete a person by ID (requires JWT).

### Menu Endpoints (`/menu`)

- `POST /menu/` — Add a new menu item.
- `GET /menu/` — Get all menu items.
- `GET /menu/:taste` — Get menu items by taste (`spicy`, `sour`, `sweet`, `bitter`).
- `PUT /menu/:id` — Update a menu item by ID.
- `DELETE /menu/:id` — Delete a menu item by ID.

## Data Models

### Person
- `name` (String, required)
- `age` (Number)
- `work` (String: chef, manager, waiter, required)
- `mobile` (String)
- `email` (String, unique)
- `username` (String, required)
- `password` (String, required, hashed)

### Menu
- `name` (String, required)
- `price` (String, required)
- `taste` (String: spicy, sour, sweet, bitter, required)
- `is_drink` (Boolean, default: false)
- `ingredients` (Array)
- `num_sales` (Number)

## Project Structure

```
1-first-step/
├── auth.js               # Passport authentication setup
├── db.js                 # MongoDB connection setup
├── jwt.js                # JWT authentication helpers
├── models/
│   ├── menu.js           # Menu schema/model
│   └── person.js         # Person schema/model
├── routes/
│   ├── menuItemRoutes.js # Menu API routes
│   └── personRoutes.js   # Person API routes
├── server.js             # Express app entry point
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## License

MIT
