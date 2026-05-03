import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          Alert.alert("Session expired", "Please log in again.");
          logout();
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        // Start animation when data loads
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } catch (err) {
        console.log("Profile fetch error:", err.response?.data || err.message);
        Alert.alert("Error", err.response?.data?.error || "Unable to load profile");
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getTierGradient = (tier) => {
    switch (tier) {
      case "Gold":
        return ["#FFD700", "#FFB800"];
      case "Silver":
        return ["#C0C0C0", "#A9A9A9"];
      default:
        return ["#CD7F32", "#8B4513"];
    }
  };

  const achievements = [
    { name: "First Order!", icon: "🍔", desc: "You placed your first order!", progress: 100 },
    { name: "Foodie Explorer", icon: "🍱", desc: "Try 5 different dishes", progress: 60 },
    { name: "Streak Master", icon: "🔥", desc: "Order 3 days in a row", progress: 30 },
    { name: "Top Reviewer", icon: "⭐", desc: "Write 5 food reviews", progress: 75 },
    { name: "Loyal Customer", icon: "👑", desc: "Spend ₹1000 or more", progress: 45 },
  ];

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ color: "#aaa", marginTop: 10 }}>Loading profile...</Text>
      </View>
    );

  if (!user)
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No user data found.</Text>
      </View>
    );

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* PROFILE CARD */}
        <Animated.View style={[styles.profileCard, { opacity: fadeAnim }]}>
          <LinearGradient colors={getTierGradient(user.tier)} style={styles.avatarBorder}>
            <Image
              source={{
                uri:
                  user.role === "student"
                    ? "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                    : "https://cdn-icons-png.flaticon.com/512/219/219970.png",
              }}
              style={styles.avatar}
            />
          </LinearGradient>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.tierBox}>
            <Text style={styles.tierText}>🏆 {user.tier} Tier</Text>
            <Text style={styles.pointsText}>⭐ {user.points} Points</Text>
          </View>
        </Animated.View>

        {/* GAMIFIED ACHIEVEMENTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Your Achievements</Text>
          {achievements.map((a, i) => (
            <LinearGradient
              key={i}
              colors={["#1E3A8A", "#312E81"]}
              style={styles.achievementCard}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.achievementIcon}>{a.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.achievementName}>{a.name}</Text>
                  <Text style={styles.achievementDesc}>{a.desc}</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${a.progress}%` }]} />
              </View>

              <Text style={styles.progressText}>{a.progress}%</Text>
            </LinearGradient>
          ))}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LinearGradient colors={["#FF416C", "#FF4B2B"]} style={styles.logoutGradient}>
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  profileCard: {
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarBorder: {
    borderRadius: 80,
    padding: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#111",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(255,255,255,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  email: { color: "#aaa", marginBottom: 8, fontSize: 14 },
  tierBox: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  tierText: { fontSize: 18, color: "#FFD700", fontWeight: "700" },
  pointsText: { fontSize: 15, color: "#00E5FF", fontWeight: "600" },

  section: { marginTop: 30, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00E5FF",
    marginBottom: 15,
    textShadowColor: "#007AFF",
    textShadowRadius: 10,
  },

  achievementCard: {
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    elevation: 5,
  },
  achievementIcon: { fontSize: 32, marginRight: 12 },
  achievementName: { color: "#fff", fontSize: 17, fontWeight: "700" },
  achievementDesc: { color: "#bbb", fontSize: 13, marginTop: 2 },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00E5FF",
    borderRadius: 10,
  },
  progressText: {
    color: "#00E5FF",
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },

  logoutBtn: { marginTop: 40, alignSelf: "center" },
  logoutGradient: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#FF4B2B",
    shadowOpacity: 0.4,
    elevation: 6,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
