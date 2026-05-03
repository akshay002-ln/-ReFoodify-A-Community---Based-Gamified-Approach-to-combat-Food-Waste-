import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NGOCoordination() {
  const [surplusMeals, setSurplusMeals] = useState([
    { id: 1, name: "Cheeseburger", quantity: 5 },
    { id: 2, name: "Caesar Salad", quantity: 3 },
    { id: 3, name: "Veg Wrap", quantity: 7 },
  ]);

  const notifyNGOs = () => {
    alert("✅ NGOs have been notified about the surplus meals.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🤝 NGO Coordination</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage surplus food and coordinate efficiently with partnered NGOs for pickups.
        </p>
      </motion.div>

      {/* Surplus meals grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
      >
        {surplusMeals.map((meal) => (
          <motion.div
            key={meal.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              🍽️ {meal.name}
            </h2>
            <p className="text-gray-600 text-lg">
              Quantity: <span className="font-semibold">{meal.quantity}</span>
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={notifyNGOs}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
              >
                Notify NGOs
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary & Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 max-w-3xl text-center z-10"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Total Surplus Meals:{" "}
          <span className="text-blue-600 font-bold">
            {surplusMeals.reduce((sum, meal) => sum + meal.quantity, 0)}
          </span>
        </h2>
        <button
          onClick={notifyNGOs}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          🚚 Notify NGOs of Surplus
        </button>
      </motion.div>
    </div>
  );
}
