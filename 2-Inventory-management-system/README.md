# Inventory Management System Backend

A Node.js and Express-based backend for managing inventory items, with authentication and CRUD operations. Data is stored in MongoDB using Mongoose.

## Features
- User authentication with JWT
- Secure password hashing with bcrypt
- CRUD operations for products
- Product categories: electronics, stationary, clothing, consumable
- Request logging middleware

## Installation

1. Clone the repository and navigate to this directory:
   ```bash
   git clone <repo-url>
   cd 2-Inventory-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in this directory with:
     ```env
     MONGO_URL=mongodb://127.0.0.1:27017/inventory
     JWT_SECRET=your_jwt_secret
     ```
   - Adjust values as needed.
4. Start the server:
   ```bash
   node server.js
   ```
   The server runs on port 3000 by default.

## Usage

- All `/product` endpoints require a valid JWT token in the `Authorization` header (except signup and login).
- Example header: `Authorization: Bearer <token>`

## API Endpoints

### `POST /product/signup`
- Register a new product (user).
- Request body:
  ```json
  {
    "name": "Item Name",
    "description": "Details",
    "Category": "electronics",
    "quantity": 10,
    "price": 99.99,
    "supplier": "Supplier Name",
    "username": "user1",
    "password": "pass123"
  }
  ```
- Returns: Created product and JWT token.

### `GET /product/login`
- Login with username and password.
- Request body:
  ```json
  {
    "username": "user1",
    "password": "pass123"
  }
  ```
- Returns: JWT token.

### `GET /product/`
- Get all products (requires JWT).

### `PUT /product/:id`
- Update a product by ID (requires JWT).
- Request body: Fields to update.

### `DELETE /product/:id`
- Delete a product by ID (requires JWT).

## Data Model

Product fields:
- `name` (String, required)
- `description` (String)
- `Category` (String: electronics, stationary, clothing, consumable, required)
- `quantity` (Number, default: 1)
- `price` (Number, required)
- `supplier` (String)
- `username` (String, required)
- `password` (String, required, hashed)

## Project Structure

```
2-Inventory-management-system/
├── db.js                # MongoDB connection setup
├── jwt.js               # JWT authentication helpers
├── models/
│   └── product.js       # Product schema/model
├── routes/
│   └── productRoutes.js # Product API routes
├── server.js            # Express app entry point
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## License

MIT
