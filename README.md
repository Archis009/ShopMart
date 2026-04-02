# ShopMart - E-Commerce Application

A production-ready e-commerce web application built with **React**, **Node.js + Express**, and **MongoDB**. Designed with clean code practices, comprehensive testing, and DevOps best practices.

## 🎯 Quick Start

### Prerequisites
- **Node.js** v16+ and npm
- **MongoDB** running locally or connection string ready
- Git

### Installation

**Backend Setup:**
```bash
cd server
npm install
cp .env.example .env  # Update MongoDB URI and JWT_SECRET
npm run dev          # Start development server on port 5001
```

**Frontend Setup:**
```bash
cd client
npm install
npm run dev          # Start on port 3000
```

Visit http://localhost:3000 in your browser.

---

## 📐 Architecture

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router, Axios, CSS |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Testing** | Jest, Supertest |

### Project Structure

```
ShopMart/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components (Login, Products, Cart)
│   │   ├── services/         # API client (axios)
│   │   ├── utils/            # Context (Auth, Cart)
│   │   ├── styles/           # CSS files
│   │   └── App.jsx           # Main component with routing
│   └── vite.config.js        # Vite configuration
│
├── server/                    # Backend Express app
│   ├── src/
│   │   ├── models/           # MongoDB schemas (User, Product, Order)
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Auth, Error handling
│   │   ├── config/           # Database connection
│   │   └── app.js            # Express app setup
│   ├── tests/                # Jest tests
│   ├── .env                  # Environment variables
│   └── jest.config.js        # Jest configuration
│
└── .github/workflows/        # CI/CD pipelines (coming soon)
```

---

## 🔑 Core Features

### User Authentication
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Token-based authorization

### Products
- ✅ Browse all products with search
- ✅ View product details (admin: add/edit/delete)
- ✅ Product inventory management
- ✅ Category filtering (coming soon)

### Shopping Cart
- ✅ Add/remove products from cart
- ✅ Update quantities
- ✅ Persistent cart storage (localStorage)
- ✅ Calculate total prices

### Orders
- ✅ Create orders from cart
- ✅ View order history
- ✅ Order status tracking (admin only)
- ✅ Inventory deduction on order

### Admin Panel
- ✅ Product CRUD operations
- ✅ Order status management
- ✅ User role-based access control

---

## 🏃 API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - User login
GET    /api/auth/profile      - Get current user (requires auth)
```

### Products
```
GET    /api/products          - Get all products (with search/filter)
GET    /api/products/:id      - Get single product
POST   /api/products          - Create product (admin only)
PATCH  /api/products/:id      - Update product (admin only)
DELETE /api/products/:id      - Delete product (admin only)
```

### Orders
```
POST   /api/orders            - Create new order (requires auth)
GET    /api/orders            - Get user's orders (requires auth)
GET    /api/orders/:id        - Get order details (requires auth)
PATCH  /api/orders/:id        - Update order status (admin only)
GET    /api/orders/admin/all  - Get all orders (admin only)
```

---

## 🧪 Testing

### Backend Tests

**Unit & Integration Tests:**
```bash
cd server
npm test                 # Run all tests
npm run test:watch     # Watch mode
npm run test -- --coverage  # With coverage report
```

**Test Files:**
- `tests/auth.test.js` - Authentication endpoints
- `tests/product.test.js` - Product CRUD operations

**Current Coverage:**
- Auth routes (register, login)
- Product creation and admin-only restrictions
- Database integration

### Frontend Tests (Optional)
```bash
cd client
npm test               # Run tests
npm run test -- --coverage
```

---

## 🔐 Authentication Flow

1. **Register**: User creates account → Password hashed with bcryptjs → JWT token returned
2. **Login**: Validate credentials → Compare password hash → JWT token issued
3. **Protected Routes**: Client sends token in `Authorization: Bearer <token>` header
4. **Middleware**: Server verifies JWT → Attaches user info to request → Allows access

**Token Structure:**
```json
{
  "id": "user_mongodb_id",
  "email": "user@example.com",
  "role": "user" or "admin"
}
```

---

## 📝 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  shippingAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Development Workflow

### Backend Development

**Start development server:**
```bash
cd server
npm run dev
```

**Run linting:**
```bash
npm run lint        # Fix lint errors
npm run lint:check  # Check without fixing
```

**MongoDB Setup:**
```bash
# Using MongoDB locally
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with connection string
```

### Frontend Development

**Start development server:**
```bash
cd client
npm run dev
```

**Build for production:**
```bash
npm run build       # Creates optimized build
npm run preview     # Preview production build
```

---

## 🛠️ Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/shopsmart
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
```

---

## 💡 Key Design Decisions

### 1. **JWT Authentication**
- Stateless authentication (no server session storage)
- Token stored in localStorage (frontend)
- Included in every API request via Authorization header

### 2. **Context API (React)**
- Simple state management without external libraries
- `AuthContext` - User login state and token
- `CartContext` - Shopping cart with localStorage persistence

### 3. **Mongoose for MongoDB**
- Object Data Modeling (ODM)
- Schema validation
- Built-in middleware for password hashing

### 4. **Express Middleware Pattern**
- Clean separation: Auth → Controller → Response
- Error handling middleware for consistent error responses
- CORS enabled for frontend-backend communication

### 5. **Functional React Components**
- Modern React hooks (useState, useContext, useEffect)
- Component composition for reusability
- Clean CSS for styling (no Tailwind dependency)

---

## 🔍 How to Explain This to a Mentor

### "The Big Picture"
> "I built a full-stack e-commerce app where users can **register, login, browse products, add to cart, and place orders**. The **backend handles all business logic** (user authentication, product management, order processing), while the **frontend provides a clean UI** for customers and admins."

### "Architecture in 3 Steps"
1. **Frontend (React)** - User clicks "Add to Cart" → sends API request
2. **Backend (Express)** - Validates user, updates database, sends response
3. **Database (MongoDB)** - Stores users, products, orders

### "Security Highlights"
- **Passwords**: Hashed with bcryptjs (never stored plain text)
- **Authentication**: JWT tokens issued on login
- **Authorization**: Admin-only routes (product creation) protected

### "What Makes It Production-Ready"
- ✅ Error handling middleware (graceful error responses)
- ✅ Input validation (required fields, email format)
- ✅ Role-based access control (admin vs user routes)
- ✅ Database relationships (Orders link to Users & Products)
- ✅ Tests for critical paths (auth, product CRUD)

---

## 📊 Testing Strategy

### What We Test
1. **Authentication** - Register, login, token validation
2. **Product CRUD** - Create (admin only), read, update, delete
3. **Authorization** - Non-admin users can't create products
4. **Database Integration** - Data saved/retrieved correctly

### Running Tests
```bash
cd server
npm test              # Jest runs all .test.js files
```

### Example Test Output
```
 PASS  tests/auth.test.js
  Auth Routes
    POST /api/auth/register
      ✓ should register a new user
      ✓ should reject duplicate email
    POST /api/auth/login
      ✓ should login with valid credentials
      ✓ should reject invalid credentials

Tests: 4 passed, 4 total
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if MongoDB is running
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Check if port 5001 is available
lsof -i :5001
```

### Frontend Not Connecting to Backend
```bash
# Check backend is running on http://localhost:5001/api/health
curl http://localhost:5001/api/health

# Update VITE_API_URL in client/.env if different
```

### Test Failures
```bash
# Clear jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

---

## 📈 Future Enhancements

- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] Order email notifications
- [ ] Payment gateway integration (Stripe)
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Advanced filtering and sorting
- [ ] Admin dashboard with analytics
- [ ] Docker containerization
- [ ] GitHub Actions CI/CD pipeline
- [ ] End-to-end tests with Cypress

---

## 📄 License

MIT - Feel free to use for learning and development.

---

## 🤝 Contributing

This is a learning project. Feel free to fork and extend!

---

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review test files for usage examples
3. Check API endpoints documentation

---

**Happy coding! 🚀**
