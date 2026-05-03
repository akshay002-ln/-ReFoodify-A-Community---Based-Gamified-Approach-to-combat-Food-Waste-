import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const data = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 900 },
    { day: "Wed", sales: 1500 },
    { day: "Thu", sales: 1100 },
    { day: "Fri", sales: 1800 },
    { day: "Sat", sales: 2400 },
    { day: "Sun", sales: 2200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 Analytics Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Track your daily sales, customer engagement, and popular dishes.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-1">Daily Sales</h2>
          <p className="text-4xl font-extrabold text-blue-600">₹12,345</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-1">Most Popular Dish</h2>
          <p className="text-3xl font-bold text-green-600">Cheeseburger 🍔</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-1">Total Points Given</h2>
          <p className="text-4xl font-extrabold text-purple-600">5,678</p>
        </div>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl mt-12 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-8 relative z-10"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Weekly Sales Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
