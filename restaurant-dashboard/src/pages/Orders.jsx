import React from "react";
import { motion } from "framer-motion";

export default function Orders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      items: ["Cheeseburger", "Fries"],
      total: 249,
      status: "Pending Feedback",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: ["Caesar Salad"],
      total: 149,
      status: "Reviewed",
    },
    {
      id: "ORD-003",
      customer: "Peter Jones",
      items: ["Cheeseburger"],
      total: 199,
      status: "Served",
    },
    {
      id: "ORD-004",
      customer: "Rahul Mehta",
      items: ["Paneer Wrap", "Cold Coffee"],
      total: 269,
      status: "In Progress",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Feedback":
        return "bg-yellow-100 text-yellow-700";
      case "Reviewed":
        return "bg-green-100 text-green-700";
      case "Served":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          📦 Orders Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Track and manage all customer orders in real time.
        </p>
      </motion.div>

      {/* Orders grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
      >
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">
                  #{order.id}
                </h2>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 mb-2">
                <span className="font-medium">Customer:</span>{" "}
                {order.customer}
              </p>

              <p className="text-gray-600 mb-2">
                <span className="font-medium">Items:</span>{" "}
                {order.items.join(", ")}
              </p>

              <p className="text-gray-800 font-semibold text-lg mt-2">
                ₹ {order.total.toFixed(2)}
              </p>
            </div>

            <div className="mt-5 flex justify-between">
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                View Details
              </button>
              <button className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition">
                Mark Served
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
