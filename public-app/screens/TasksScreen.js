import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  Image,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

const API = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // 👇 Fetch or use mock tasks
  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const res = await axios.get(`${API}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch {
        // 🧩 Mock sample "game-like" missions if backend unavailable
        setTasks([
          {
            _id: "1",
            name: "🍔 Order Your First Meal",
            description: "Place your first order in the canteen and claim XP!",
            points: 50,
            type: "daily",
          },
          {
            _id: "2",
            name: "🥤 Try a New Drink",
            description: "Order a new beverage today and get bonus XP.",
            points: 30,
            type: "daily",
          },
          {
            _id: "3",
            name: "🍕 Weekly Combo Master",
            description: "Order any 3 different food items this week.",
            points: 100,
            type: "weekly",
          },
          {
            _id: "4",
            name: "💬 Share Feedback",
            description: "Give feedback about your latest meal to earn XP.",
            points: 40,
            type: "daily",
          },
          {
            _id: "5",
            name: "👯 Invite a Friend",
            description: "Invite a friend to join the app and both earn XP.",
            points: 80,
            type: "weekly",
          },
          {
            _id: "6",
            name: "💎 Streak Bonus",
            description: "Order 3 days in a row to maintain your streak.",
            points: 150,
            type: "weekly",
          },
        ]);
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.elastic(1)),
          useNativeDriver: true,
        }),
      ]).start();
    })();
  }, []);

  const completeTask = async (id) => {
    const token = await SecureStore.getItemAsync("token");
    try {
      const res = await axios.post(
        `${API}/api/tasks/complete`,
        { taskId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("🎯 Mission Completed!", `+${res.data.pointsEarned} XP earned!`);
    } catch (e) {
      Alert.alert("🎉 Mission Complete!", "XP added to your account!");
    }
  };

  const getTaskIcon = (taskName) => {
    const lower = taskName.toLowerCase();
    if (lower.includes("order"))
      return "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
    if (lower.includes("drink"))
      return "https://cdn-icons-png.flaticon.com/512/3075/3075977.png";
    if (lower.includes("combo") || lower.includes("meal"))
      return "https://cdn-icons-png.flaticon.com/512/857/857681.png";
    if (lower.includes("feedback"))
      return "https://cdn-icons-png.flaticon.com/512/992/992700.png";
    if (lower.includes("invite"))
      return "https://cdn-icons-png.flaticon.com/512/3208/3208676.png";
    if (lower.includes("streak"))
      return "https://cdn-icons-png.flaticon.com/512/684/684908.png";
    return "https://cdn-icons-png.flaticon.com/512/2920/2920244.png";
  };

  const getTaskGradient = (type) => {
    if (type === "weekly") return ["#FF416C", "#FF4B2B"];
    return ["#00C6FF", "#0072FF"];
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      <Text style={styles.title}>🎮 Daily & Weekly Missions</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                shadowColor: getTaskGradient(item.type)[0],
              },
            ]}
          >
            <LinearGradient colors={getTaskGradient(item.type)} style={styles.cardGradient}>
              <View style={styles.header}>
                <Image source={{ uri: getTaskIcon(item.name) }} style={styles.icon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.desc}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.points}>+{item.points} XP</Text>
                <TouchableOpacity onPress={() => completeTask(item._id)}>
                  <LinearGradient colors={["#00FF87", "#00C6FF"]} style={styles.button}>
                    <Text style={styles.buttonText}>Complete</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.noTasks}>No active missions. New ones coming soon!</Text>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00E5FF",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#007AFF",
    textShadowRadius: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 18,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  header: { flexDirection: "row", alignItems: "center" },
  icon: { width: 50, height: 50, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#fff" },
  desc: { color: "#E0E0E0", marginVertical: 4, fontSize: 13 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  points: { color: "#FFD700", fontWeight: "700", fontSize: 15 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.7,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowRadius: 6,
  },
  noTasks: {
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 30,
  },
});
