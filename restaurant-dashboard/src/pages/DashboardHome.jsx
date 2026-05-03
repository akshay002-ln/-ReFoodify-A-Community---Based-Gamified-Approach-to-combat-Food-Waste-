import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Star,
} from "lucide-react";

export default function DashboardHome() {
  const data = [
    { name: "Mon", sales: 2000 },
    { name: "Tue", sales: 3200 },
    { name: "Wed", sales: 1800 },
    { name: "Thu", sales: 4000 },
    { name: "Fri", sales: 3600 },
    { name: "Sat", sales: 2900 },
    { name: "Sun", sales: 2500 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="text-blue-100 mt-2">
            Here’s an overview of your restaurant’s performance today.
          </p>
        </div>
        <TrendingUp className="w-12 h-12 opacity-70" />
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <DashboardCard
          title="Total Orders"
          value="156"
          icon={<ShoppingBag className="text-blue-500" />}
          trend="+12% vs last week"
        />
        <DashboardCard
          title="Active Customers"
          value="48"
          icon={<Users className="text-green-500" />}
          trend="+8% this week"
        />
        <DashboardCard
          title="Avg. Rating"
          value="4.7 ★"
          icon={<Star className="text-yellow-500" />}
          trend="Great Feedback!"
        />
        <DashboardCard
          title="Revenue (₹)"
          value="₹12,340"
          icon={<TrendingUp className="text-purple-500" />}
          trend="+5.3% growth"
        />
      </motion.div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Weekly Sales Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #eee",
              }}
            />
            <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Recent Orders
          </h2>
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, name: "Cheeseburger", amount: "₹199" },
              { id: 2, name: "Caesar Salad", amount: "₹149" },
              { id: 3, name: "French Fries", amount: "₹99" },
              { id: 4, name: "Paneer Wrap", amount: "₹129" },
            ].map((order) => (
              <li
                key={order.id}
                className="flex justify-between py-2 text-gray-700"
              >
                <span>{order.name}</span>
                <span className="font-medium">{order.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Top Rated Dishes
          </h2>
          <ul className="divide-y divide-gray-200">
            {[
              { name: "Cheeseburger", rating: 4.9 },
              { name: "Veg Sandwich", rating: 4.8 },
              { name: "Cold Coffee", rating: 4.7 },
              { name: "Caesar Salad", rating: 4.6 },
            ].map((dish, i) => (
              <li
                key={i}
                className="flex justify-between py-2 text-gray-700"
              >
                <span>{dish.name}</span>
                <span className="font-semibold text-yellow-600">
                  ⭐ {dish.rating}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-green-500 mt-1">{trend}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    </div>
  );
}
