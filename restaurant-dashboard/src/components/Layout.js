import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  BarChart3,
  HeartHandshake,
  QrCode,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Layout({ children }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/menu-management", label: "Menu Management", icon: <Utensils size={18} /> },
    { to: "/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
    { to: "/feedback-ratings", label: "Feedback", icon: <HeartHandshake size={18} /> },
    { to: "/ngo-coordination", label: "NGO Coordination", icon: <HeartHandshake size={18} /> },
    { to: "/qr-code-generator", label: "QR Generator", icon: <QrCode size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-xl transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1
            className={`text-xl font-bold text-blue-600 transition-all duration-300 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            🍽️ Canteen Hub
          </h1>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.icon}
              <span className={`${!isSidebarOpen && "hidden"}`}>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome, {user?.name || "User"} 👋
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">{user?.email}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
