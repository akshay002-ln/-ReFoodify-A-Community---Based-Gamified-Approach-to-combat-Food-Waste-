// backend/index.js - final, cleaned, dev-friendly
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// ----------------- Configuration -----------------
const MONGO =
  process.env.MONGO ||
  "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/canteen?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const QR_TOKEN_BYTES = parseInt(process.env.QR_TOKEN_BYTES || "32");

// CORS: allow origins from env or sensible defaults for dev
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const defaultOrigins = [
  "http://localhost:3000", // Web app
  "http://10.0.2.2:19000", // Expo Android emulator
  "exp://10.0.2.2:19000",
  "http://localhost:19006",
];

app.use(
  cors({
    origin: CLIENT_ORIGINS.length ? CLIENT_ORIGINS : defaultOrigins,
    credentials: true,
  })
);

// ----------------- MongoDB connection -----------------
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((e) => {
    console.error("❌ MongoDB connection error:", e.message);
    process.exit(1);
  });

// ----------------- Schemas / Models -----------------
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, index: true, unique: false },
    passwordHash: String,
    role: { type: String, enum: ["student", "restaurant"], default: "student" },
    points: { type: Number, default: 0 },
    badges: [{ name: String, icon: String, achievedAt: Date }],
    avatar: String,
  },
  { timestamps: true }
);
UserSchema.virtual("tier").get(function () {
  if (this.points >= 1000) return "Gold";
  if (this.points >= 500) return "Silver";
  return "Bronze";
});
const User = mongoose.model("User", UserSchema);

const Order = mongoose.model(
  "Order",
  new Schema(
    {
      orderId: String,
      studentId: Schema.Types.ObjectId,
      restaurantId: Schema.Types.ObjectId,
      items: Array,
      totalAmount: Number,
      paymentStatus: { type: String, default: "pending" },
      paymentTransactionId: String,
      qrTokenId: Schema.Types.ObjectId,
      status: { type: String, default: "pending" },
      scannedAt: Date,
    },
    { timestamps: true }
  )
);

const QRToken = mongoose.model(
  "QRToken",
  new Schema({
    orderId: Schema.Types.ObjectId,
    restaurantId: Schema.Types.ObjectId,
    token: String,
    expiresAt: Date,
    used: { type: Boolean, default: false },
    usedByStudentId: Schema.Types.ObjectId,
    usedAt: Date,
  })
);

const FraudLog = mongoose.model(
  "FraudLog",
  new Schema({
    type: String,
    details: Object,
    timestamp: { type: Date, default: Date.now },
  })
);

const Task = mongoose.model(
  "Task",
  new Schema({
    name: String,
    description: String,
    points: Number,
    type: { type: String, enum: ["daily", "weekly"], default: "daily" },
    isActive: { type: Boolean, default: true },
  })
);

const Reward = mongoose.model(
  "Reward",
  new Schema({
    name: String,
    description: String,
    cost: Number,
    image: String,
  })
);

const Feedback = mongoose.model(
  "Feedback",
  new Schema({
    orderId: Schema.Types.ObjectId,
    studentId: Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    foodUntouched: Boolean,
    createdAt: { type: Date, default: Date.now },
  })
);

// ----------------- Seed tasks & rewards (dev-safe) -----------------
(async () => {
  try {
    if ((await Task.countDocuments()) === 0) {
      await Task.insertMany([
        { name: "Order a Meal", description: "Place one food order today", points: 50 },
        { name: "Scan QR", description: "Scan a payment QR after purchase", points: 30 },
        { name: "Submit Feedback", description: "Give feedback on your meal", points: 20 },
        { name: "Invite a Friend", description: "Get a friend to join the app", points: 100, type: "weekly" },
      ]);
      console.log("✅ Sample tasks added");
    }
    if ((await Reward.countDocuments()) === 0) {
      await Reward.insertMany([
        { name: "Free Drink Coupon", description: "Redeem for one free juice", cost: 200, image: "https://i.imgur.com/nQF6FvD.png" },
        { name: "Canteen Discount", description: "10% off next order", cost: 400, image: "https://i.imgur.com/8m8p7Gb.png" },
        { name: "Smart Bottle Sticker", description: "Exclusive merch item", cost: 600, image: "https://i.imgur.com/Phc02AF.png" },
      ]);
      console.log("✅ Sample rewards added");
    }
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  }
})();

// ----------------- Auth middleware -----------------
const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).send({ error: "Unauthorized" });
  try {
    const token = header.replace("Bearer ", "");
    const data = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(data.id);
    if (!req.user) return res.status(401).send({ error: "Invalid token" });
    next();
  } catch (e) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).send({ error: `Access denied. Only [${roles.join(", ")}] allowed.` });
    next();
  };
};

// ----------------- Utility to sanitize user before send -----------------
function sanitizeUser(u) {
  if (!u) return null;
  return {
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    points: u.points,
    badges: u.badges || [],
    avatar: u.avatar || null,
    tier: u.points >= 1000 ? "Gold" : u.points >= 500 ? "Silver" : "Bronze",
  };
}

// ----------------- Simple routes -----------------
app.get("/", (req, res) => res.send({ ok: true, msg: "Canteen backend up and running ✅" }));

// ping route for quick check
app.get("/api/ping", (req, res) => res.send({ ok: true, msg: "pong", time: new Date() }));

// Auth — register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).send({ error: "Email and password required" });
    if (await User.findOne({ email })) return res.status(400).send({ error: "Email already exists" });

    const passwordHash = bcrypt.hashSync(password, 8);
    const user = await User.create({ name, email, passwordHash, role });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Auth — login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🧠 Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found for:", email);
      return res.status(400).send({ error: "Invalid credentials" });
    }

    console.log("✅ Found user:", user.email);
    console.log("🔒 Stored hash:", user.passwordHash);
    console.log("🧩 Entered password:", password);

    const isValid = bcrypt.compareSync(password, user.passwordHash);
    console.log("🔍 bcrypt.compareSync() result:", isValid);

    if (!isValid) {
      console.log("❌ Password does not match!");
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("✅ Login success! Token generated:", token.substring(0, 20) + "...");

    res.send({ user, token });
  } catch (err) {
    console.error("💥 Login error:", err);
    res.status(500).send({ error: err.message });
  }
});

// public leaderboard route (mobile & web fetch this)
app.get("/api/leaderboard", async (req, res) => {
  try {
    const top = await User.find({ role: "student" })
      .sort({ points: -1 })
      .limit(20)
      .lean();
    const mapped = top.map((u) => ({
      id: u._id,
      name: u.name,
      points: u.points || 0,
      avatar: u.avatar || null,
      tier: u.points >= 1000 ? "Gold" : u.points >= 500 ? "Silver" : "Bronze",
    }));
    res.send(mapped);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ----------------- Dev: seed leaderboard (only for dev/testing) -----------------
// Use once then remove or protect it in production
app.get("/api/seed/leaderboard", async (req, res) => {
  try {
    const sample = [
      { name: "Vijay", email: `vijay+${Date.now()}@test.com`, passwordHash: "seed", role: "student", points: 1200 },
      { name: "Ravi", email: `ravi+${Date.now()}@test.com`, passwordHash: "seed", role: "student", points: 800 },
      { name: "Sita", email: `sita+${Date.now()}@test.com`, passwordHash: "seed", role: "student", points: 450 },
      { name: "Akshay", email: `akshay+${Date.now()}@test.com`, passwordHash: "seed", role: "student", points: 140 },
    ];
    await User.insertMany(sample);
    res.send({ ok: true, msg: "Seeded leaderboard (dev) — check /api/leaderboard" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Authenticated route to get current user details
app.get("/api/auth/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send({ ok: true, user: sanitizeUser(user) });
  } catch (err) {
    console.error("Error in /api/auth/me:", err);
    res.status(500).send({ error: err.message });
  }
});

// Also keep /api/user/me as alias (your mobile code used this earlier)
app.get("/api/user/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send(sanitizeUser(user));
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Student-only create order example
app.post("/api/orders/create", auth, requireRole("student"), async (req, res) => {
  try {
    const { restaurantId, items, totalAmount } = req.body;
    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      studentId: req.user._id,
      restaurantId,
      items,
      totalAmount,
    });
    res.send({ ok: true, order });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/api/orders", auth, requireRole("student"), async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user._id }).sort({ createdAt: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Restaurant-only analytics example
app.get("/api/analytics", auth, requireRole("restaurant"), async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ restaurantId: req.user._id });
    const revenueAgg = await Order.aggregate([
      { $match: { restaurantId: req.user._id } },
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } },
    ]);
    res.send({
      totalOrders,
      totalRevenue: revenueAgg[0]?.revenue || 0,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ----------------- Shared routes -----------------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err && err.message ? err.message : err);
  res.status(err.status || 500).send({ error: err.message || "Internal Server Error" });
});

// ----------------- Start server -----------------
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
