import React from "react";
import { motion } from "framer-motion";

export default function FeedbackRatings() {
  const feedback = [
    {
      id: 1,
      customer: "John Doe",
      meal: "Cheeseburger",
      rating: 5,
      comment: "Absolutely delicious! Best burger in town.",
    },
    {
      id: 2,
      customer: "Jane Smith",
      meal: "Caesar Salad",
      rating: 4,
      comment: "The salad was fresh and tasty, but could have used more dressing.",
    },
    {
      id: 3,
      customer: "Peter Jones",
      meal: "Cheeseburger",
      rating: 3,
      comment: "It was okay. A bit dry.",
    },
  ];

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600 bg-green-100";
    if (rating === 3) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🌟 Feedback & Ratings
        </h1>
        <p className="text-gray-600 text-lg">
          Read what your customers say about your meals.
        </p>
      </motion.div>

      {/* Feedback List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
      >
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                🍽️ {item.meal}
              </h2>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getRatingColor(
                  item.rating
                )}`}
              >
                {item.rating}★
              </span>
            </div>

            <p className="text-gray-700 font-medium">{item.customer}</p>

            <p className="text-yellow-500 text-lg mb-2">
              {"⭐".repeat(item.rating)}
            </p>

            <p className="text-gray-600 italic">“{item.comment}”</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 max-w-3xl text-center z-10"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Average Rating:{" "}
          <span className="text-blue-600 font-bold">
            {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}★
          </span>
        </h2>
        <p className="text-gray-600">
          Based on {feedback.length} recent reviews.
        </p>
      </motion.div>
    </div>
  );
}
