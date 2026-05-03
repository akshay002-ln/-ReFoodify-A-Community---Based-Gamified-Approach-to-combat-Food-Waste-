import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ FIXED: added useNavigate
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard"); // ✅ Redirect logged-in users
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-hidden">
      {/* Animated background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute w-[600px] h-[600px] bg-blue-400 rounded-full blur-3xl top-[-100px] right-[-150px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute w-[500px] h-[500px] bg-pink-400 rounded-full blur-3xl bottom-[-100px] left-[-100px]"
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="z-10 text-center px-6 max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-600">ReFoodify</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Manage your restaurant operations, analyze performance, and coordinate with NGOs effortlessly.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-md transition"
          >
            Register
          </Link>
          <Link
            to="/menu-management"
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl shadow-md transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
