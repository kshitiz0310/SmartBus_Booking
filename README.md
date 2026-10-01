# 🚌 Smart Bus Booking System

An ultra-modern, full-stack **MERN (MongoDB, Express.js, React 18, Node.js)** Bus Reservation & Transport Fleet Management Web Application. Built with sleek glassmorphic UI aesthetics, real-time interactive seat maps, flexible multi-payment gateways, and role-based administration.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://smart-bus-booking-belg-jiux9wss1.vercel.app/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

---

## 🌟 Live Demo & Preview

* 🌐 **Live Website**: [https://smart-bus-booking-belg-jiux9wss1.vercel.app/](https://smart-bus-booking-belg-jiux9wss1.vercel.app/)
* ⚡ **Backend API**: `https://smart-bus-booking.vercel.app/api`

---

## ✨ Key Features

### 👤 Passenger Portal & Booking Engine
* 🔍 **Smart Route Search**: Instant search by Origin, Destination, Travel Date, and AC / Non-AC Sleeper filters.
* ⚡ **Quick Selection Chips**: One-click popular route pre-fills (e.g. `GLA → MZP`, `Delhi → Manali`, `Mumbai → Goa`).
* 🎟️ **Interactive 40-Seat Layout**: Real-time visual seat selection map displaying Available, Selected, and Booked seats.
* 💳 **Multi-Payment Modes**:
  * **Instant Demo Checkout**: 1-Click test payment for friction-free evaluation without requiring external keys.
  * **Razorpay Online Gateway**: Card, NetBanking, and UPI integration using Razorpay SDK.
  * **UPI QR / Manual UTR**: Enter transaction reference numbers for manual admin verification.
* 🎫 **Digital Ticket Passes**: View detailed ticket receipts with departure times, seat numbers, price breakdown, and status badges.

### 🛡️ Super Admin Control Center
* 📊 **Real-Time Analytics Dashboard**: Live metric counters for Total Buses, Total Passenger Reservations, Registered Users, and Estimated Revenue.
* 🚌 **Fleet Operations Manager**: Add new buses to fleet, schedule departure/arrival times, set fares, driver contact details, and seat capacities.
* 📋 **Booking Verification**: Monitor passenger reservations, approve/reject pending UTR payments, or process cancellations.
* 👥 **User Account Management**: Directory of registered accounts with inline role editing (`user` ↔ `admin`).
* 📥 **CSV Data Export**: Export booking and financial reports directly to CSV.

---

## 🛠️ Tech Stack Architecture

### Frontend
| Component | Technology |
| :--- | :--- |
| **Framework** | React 18 (Create React App) |
| **Routing** | React Router DOM v6 |
| **Styling** | Dark Glassmorphic Custom CSS, Material UI (`@mui/material`) |
| **Icons & Animations** | `lucide-react`, `lottie-react`, AOS (Animate On Scroll) |
| **HTTP Client** | Axios (with bearer token interceptors) |

### Backend & Infrastructure
| Component | Technology |
| :--- | :--- |
| **Runtime** | Node.js (ES Modules syntax) |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas (Mongoose ORM) |
| **Authentication** | JSON Web Tokens (JWT) & `bcryptjs` password hashing |
| **Payment SDK** | Razorpay SDK & `crypto` HMAC verification |
| **Deployment** | Vercel (Serverless Functions) |

---

## 📂 Project Structure

```bash
SmartBus_Booking/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB Atlas Mongoose connection
│   ├── Middleware/
│   │   └── authMiddleware.js # JWT protection & admin authority middleware
│   ├── Models/
│   │   ├── User.js          # User schema & role enum (user, admin)
│   │   ├── Bus.js           # Bus route, fare & booked seats schema
│   │   └── Booking.js       # Passenger reservation schema
│   ├── routes/
│   │   ├── auth.js          # Registration, Login & /me endpoints
│   │   ├── busRoutes.js     # Bus search & admin CRUD routes
│   │   ├── bookingRoutes.js # Seat booking, cancellation & verification
│   │   ├── userRoutes.js    # User management & role updates
│   │   └── paymentRoutes.js # Razorpay order creation & signature verification
│   ├── server.js            # Express server entry point
│   └── vercel.json          # Vercel serverless build configuration
│
└── frontend/
    ├── public/              # HTML template & assets
    └── src/
        ├── api.jsx          # Axios instance with API URL fallback
        ├── App.jsx          # React Router setup & dynamic navbar selector
        ├── components/
        │   ├── NavbarLanding.jsx
        │   ├── NavbarUser.jsx
        │   └── NavbarAdmin.jsx
        └── pages/
            ├── HomePage.jsx       # Public landing page showcase
            ├── Login.jsx          # User & Admin authentication login
            ├── Register.jsx       # User registration screen
            ├── UserDashboard.jsx  # Route search & bus list
            ├── BookBus.jsx        # Seat map & multi-payment checkout
            ├── MyBookings.jsx     # Passenger ticket receipts
            ├── Profile.jsx        # User profile management
            ├── AdminDashboard.jsx # Admin metric overview & control modules
            ├── ManageBuses.jsx    # Fleet bus scheduler
            ├── ManageBookings.jsx # Reservation approval manager
            └── ManageUsers.jsx    # User role management table
