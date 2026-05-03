import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check token on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          const res = await axios.get(`${API_URL}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          setIsLoggedIn(true);
          console.log("✅ Session restored for:", res.data.email);
        } else {
          console.log("⚠️ No token found — user must log in.");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("❌ Auto login check failed:", err.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token, user } = res.data;

      // Save token for future app launches
      await SecureStore.setItemAsync("token", token);
      setUser(user);
      setIsLoggedIn(true);
      console.log("🎉 Logged in:", user.email);
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    setIsLoggedIn(false);
    console.log("🚪 Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
