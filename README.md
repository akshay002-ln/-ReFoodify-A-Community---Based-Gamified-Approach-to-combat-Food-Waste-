# 🍽️ ReFoodify

### A Community-Based Gamified Approach to Combat Food Waste

ReFoodify is a gamified food waste reduction platform that encourages sustainable dining through QR-based meal tracking, rewards, and feedback. Built with React Native, Node.js, and MongoDB, it promotes mindful consumption and aims to create a zero food waste ecosystem.

---

## 🚀 Overview

Food waste is a major issue in institutional dining. ReFoodify addresses this by combining:

* 📱 QR-based meal tracking
* 🎮 Gamification (points, badges, leaderboard)
* 📊 Feedback-driven system
* 🌱 Sustainable consumption

Users scan a QR code after meals, submit feedback, and earn rewards for responsible eating.

---

## 🏗️ System Architecture

```
Mobile App (React Native)
        ↓
Backend API (Node.js + Express)
        ↓
Database (MongoDB Atlas)
```

### Additional Dashboards

* 🧑‍💼 Admin Dashboard
* 🍴 Restaurant Dashboard
* 🤝 NGO Dashboard

---

## ✨ Features

### 👤 Student Module

* QR code scanning after meals
* Points, badges, and rewards
* Leaderboard system
* Profile tracking

### 🧑‍💼 Admin Dashboard

* User management
* System monitoring

### 🍴 Restaurant Dashboard *(Planned/Partial)*

* Food tracking
* Menu management

### 🤝 NGO Integration *(Future Scope)*

* Surplus food redistribution
* Real-time coordination

---

## 🛠️ Tech Stack

**Frontend**

* React Native (Mobile App)
* React.js (Dashboards)

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB Atlas

**Authentication**

* JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
ReFoodify/
│
├── backend/
├── public-app/
├── admin-dashboard/
├── ngo-dashboard/
├── restaurant-dashboard/
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/akshay002-ln/-ReFoodify-A-Community---Based-Gamified-Approach-to-combat-Food-Waste-.git
cd ReFoodify
```

### 2. Backend Setup

```
cd backend
npm install
npm start
```

Create `.env`:

```
MONGO=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

---

### 3. Mobile App

```
cd public-app
npm install
npm start
```

---

### 4. Dashboards

```
cd admin-dashboard
npm install
npm start
```

(Same for NGO & Restaurant dashboards)

---

## 🔐 Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| MONGO      | MongoDB connection string |
| JWT_SECRET | Authentication secret     |
| PORT       | Server port               |

---

## 🎯 Future Enhancements

* Real-time food surplus tracking
* NGO redistribution system
* AI-based demand prediction
* Advanced analytics

---

## 📌 Problem Statement

Large amounts of edible food are wasted daily in canteens and restaurants.
ReFoodify aims to reduce this waste through gamification and technology-driven accountability.

---

## 🤝 Contribution

Contributions are welcome. Fork the repo and submit a pull request.

---

## 📜 License

For educational and research purposes.

---

## 👨‍💻 Author

Akshay
