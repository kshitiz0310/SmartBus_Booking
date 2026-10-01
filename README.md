🚌 Smart Bus Booking
Next-Gen Bus Reservation & Transport Fleet Management

Search routes, select seats on real-time interactive maps, book tickets instantly with multi-payment options, and manage fleet operations in real-time.

---

📌 About The Project

Smart Bus Booking is a full-stack MERN application that simplifies campus, exam, and inter-city bus travel. It provides passengers with real-time seat availability maps, instant digital ticket confirmations, and flexible checkout options (Instant Demo, Razorpay Gateway, and Manual UPI UTR). It also equips transport managers with a Super Admin dashboard for fleet scheduling, booking verification, user management, and report exports.

Because booking a bus ticket should be as simple as a single tap! 🚌✨

---

✨ Features

🚌 Interactive Seat Selection — Real-time 40-seat map layout displaying available, selected, and booked seats
💳 Multi-Payment Checkout — Instant Demo Mode (1-click test checkout), Razorpay Gateway, and UPI UTR verification
🎫 Digital Ticket Passes — Detailed ticket receipts with seat numbers, route details, and status badges
🛡️ Super Admin Control Suite — Real-time metrics dashboard for buses, reservations, revenue, and users
📋 Fleet Operations Scheduler — Add buses, update departure times, assign drivers, and manage route fares
👥 User Account Directory — Manage registered accounts with inline role editing (user ↔ admin)
🔒 Secure Authentication — Protected JWT routes and session persistence

---

🛠️ Tech Stack

Frontend: React 18 ⚡, React Router v6, Material UI, Lucide Icons, AOS
Backend: Express.js, Node.js (ES Modules), JWT, Multer
Database: Atlas Cloud ☁️ (MongoDB Mongoose)
Payments: Razorpay SDK & Instant Demo Gateway

---

🚀 Live Demo

🔗 [Click here to try Smart Bus Booking](https://smart-bus-booking.vercel.app/)

---

⚙️ Getting Started (Local Setup)

```bash
# Clone the repo
git clone https://github.com/kshitiz0310/SmartBus_Booking.git

# Go into the project folder
cd SmartBus_Booking

# Install dependencies (frontend)
cd frontend
npm install

# Install dependencies (backend)
cd ../backend
npm install

# Run backend
npm run dev

# Run frontend (in a new terminal)
cd ../frontend
npm start
```

Create a `.env` file in the `backend` folder with:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
RZP_KEY=your_razorpay_key_id
RZP_SECRET=your_razorpay_secret_key
```

---

🧑💻 Author

Kshitiz Tiwari
* GitHub: [@kshitiz0310](https://github.com/kshitiz0310)
* LinkedIn: [kshitiz-tiwari](https://www.linkedin.com/in/kshitiz-tiwari-47610332b/)
* LeetCode: [kingkshitiz05](https://leetcode.com/u/kingkshitiz05/)

---

⭐ Show Some Love

If you found this project useful, consider giving it a ⭐ — it really helps!

---

📄 License

This project is licensed under the MIT License.
Made with 💻 & ☕ by Kshitiz
