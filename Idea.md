# Rent-It Platform 🏠🛠️

## 📌 Project Overview
Rent-It Platform is a full-stack e-commerce web application that allows users to **rent products instead of purchasing them**.  
The platform focuses on promoting affordability, sustainability, and smarter consumption by enabling short-term and long-term rentals of items such as tools, electronics, books, cameras, and event accessories.

---

## 🎯 Problem Statement
Many products are used occasionally but require a high upfront cost to purchase.  
Buying such items leads to unnecessary expenses and underutilization.

**Rent-It Platform solves this problem by:**
- Allowing users to rent items only when needed
- Reducing waste and promoting reuse
- Providing a structured rental system with availability tracking and secure transactions

---

## 💡 Key Features

### 👤 User Features
- User authentication (Sign up / Login)
- Browse rental products by category
- View product availability using a calendar
- Select rental duration and place orders
- Security deposit handling
- Order tracking and rental history
- Ratings and reviews for products

### 🏪 Owner / Admin Features
- Add, update, and remove rental products
- Set rental price per day
- Manage availability calendar
- Approve or reject rental requests
- Monitor active rentals and returns
- Handle late return penalties

---

## 🧠 Unique Highlights
- Rental-based pricing instead of one-time purchase
- Availability conflict handling (no double booking)
- Deposit + penalty calculation logic
- Real-world business logic implementation

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS / Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (for flexible product & rental schemas)  
  **or**
- SQL (for structured booking and transaction management)

### Other Tools
- JWT for authentication
- REST APIs
- Git & GitHub for version control

---

## 🗂️ Database Design (High-Level)

### User
- id
- name
- email
- role (user / admin)

### Product
- id
- name
- category
- pricePerDay
- securityDeposit
- availabilityDates

### Rental
- id
- userId
- productId
- startDate
- endDate
- totalCost
- status (active / returned / late)

---

## 🚀 Future Enhancements
- Online payment gateway integration
- Location-based rental search
- Insurance option for high-value items
- Subscription-based rentals
- Admin analytics dashboard

---

## 📈 Learning Outcomes
- Hands-on experience with full-stack development
- Implemented real-world rental business logic
- Improved understanding of REST APIs and database design
- Built scalable and maintainable application architecture

---

## 📎 Project Status
🚧 Currently under development (MVP Phase)

---

## 🧑‍💻 Author
**Ved**  
BTech CS (AI/ML) | Full-Stack Developer  
