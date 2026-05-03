# 🍽️ ReFoodify

### A Community-Based Gamified Approach to Combat Food Waste

ReFoodify is a full-stack, multi-module platform designed to reduce food waste in university canteens and restaurants through QR-based tracking, gamification, and real-time coordination between students, restaurants, and NGOs.

---

## 🚀 Overview

ReFoodify tackles food waste by introducing accountability and incentives into daily dining behavior.

* 📱 Students scan QR codes after meals
* 🎮 Earn rewards through gamification
* 🍴 Restaurants monitor food usage
* 🤝 NGOs coordinate surplus redistribution

The system creates a connected ecosystem that promotes sustainable consumption.

---

## 🏗️ System Architecture

```
React Native App (Students)
        ↓
Node.js + Express API
        ↓
MongoDB Atlas Database
        ↓
React Dashboards (Admin / NGO / Restaurant)
```

---

## ✨ Core Modules

### 👤 Student Mobile Application (`public-app`)

* QR code-based meal validation
* Reward system (points, badges, leaderboard)
* Feedback submission
* User profile and activity tracking

---

### 🍴 Restaurant Dashboard (`restaurant-dashboard`)

* Menu and food management
* Track food preparation and consumption
* Monitor surplus food availability

---

### 🤝 NGO Dashboard (`ngo-dashboard`)

* View surplus food listings
* Coordinate pickup and redistribution
* Manage food donation workflow

---

### 🧑‍💼 Admin Dashboard (`admin-dashboard`)

* Manage users and system data
* Monitor platform activity
* Maintain system control

---

### ⚙️ Backend API (`backend`)

* RESTful APIs using Express.js
* MongoDB Atlas integration
* JWT-based authentication
* Handles all business logic and data flow

---

## 🛠️ Tech Stack

### Frontend

* React Native (Mobile App)
* React.js (Dashboards)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
ReFoodify/
│
├── backend/
├── public-app/
│   ├── components/
│   ├── context/
│   ├── navigation/
│   └── screens/
│
├── admin-dashboard/
│   ├── public/
│   └── src/
│
├── ngo-dashboard/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── styles/
│
├── restaurant-dashboard/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── styles/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/akshay002-ln/-ReFoodify-A-Community---Based-Gamified-Approach-to-combat-Food-Waste-.git
cd ReFoodify
```

---

### 2. Backend Setup

```
cd backend
npm install
npm start
```

Create `.env` file:

```
MONGO=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

---

### 3. Run Mobile App

```
cd public-app
npm install
npm start
```

---

### 4. Run Dashboards

Run each module separately:

```
cd admin-dashboard
npm install
npm start
```

```
cd ngo-dashboard
npm install
npm start
```

```
cd restaurant-dashboard
npm install
npm start
```

---

## 🔐 Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| MONGO      | MongoDB connection string |
| JWT_SECRET | Authentication secret key |
| PORT       | Backend server port       |

---

## 📌 Problem Statement

Large quantities of edible food are wasted daily in canteens and restaurants.
ReFoodify addresses this issue by promoting responsible consumption and enabling redistribution through a connected digital ecosystem.

---

## 🎯 Key Highlights

* Multi-role system (Student, Restaurant, NGO, Admin)
* Gamified behavior change model
* QR-based real-time validation
* Scalable full-stack architecture

---

## 🤝 Contribution

Contributions are welcome. Fork the repository and submit a pull request.

---

## 📜 License

This project is intended for academic and educational purposes.

---

## 👨‍💻 Author

Akshay
