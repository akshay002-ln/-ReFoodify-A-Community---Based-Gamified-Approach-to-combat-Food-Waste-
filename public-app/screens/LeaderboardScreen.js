import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import axios from "axios";

const { width } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const confettiRef = useRef(null);

  // ⚡ Load leaderboard data
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/leaderboard`);
        setLeaders(res.data);
        setLoading(false);
      } catch (err) {
        console.log("❌ Error loading leaderboard:", err.message);
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  // ✨ Animate glow effect for top 3 ranks
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 🎉 Confetti blast when data loads
  useEffect(() => {
    if (leaders.length > 0) {
      setTimeout(() => {
        confettiRef.current?.start();
      }, 700);
    }
  }, [leaders]);

  const getMedal = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return medals[index] || "⭐";
  };

  const getBadge = (points) => {
    if (points >= 500) return "🔥 LEGEND";
    if (points >= 300) return "💎 PRO";
    if (points >= 150) return "⚡ RISING STAR";
    return "🎯 BEGINNER";
  };

  const renderItem = ({ item, index }) => {
    const isTop = index < 3;
    const bgColors = [
      ["#FFD700", "#FFA500"],
      ["#C0C0C0", "#A9A9A9"],
      ["#CD7F32", "#8B4513"],
    ];

    return (
      <Animated.View
        style={[
          styles.card,
          isTop && { transform: [{ scale: scaleAnim }] },
          {
            borderColor: isTop ? "#FFD700" : "rgba(255,255,255,0.1)",
          },
        ]}
      >
        <LinearGradient
          colors={isTop ? bgColors[index] : ["#1e293b", "#0f172a"]}
          style={styles.gradientCard}
        >
          <Text style={styles.rank}>{getMedal(index)}</Text>
          <Image
            source={{
              uri:
                item.avatar ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.points}>{item.points} pts</Text>
          </View>

          <View style={styles.badgeBox}>
            <LinearGradient
              colors={["#00E5FF", "#007AFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badge}
            >
              <Text style={styles.badgeText}>{getBadge(item.points)}</Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={["#0F172A", "#1E293B"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00E5FF" />
        <Text style={{ color: "#A0AEC0", marginTop: 10 }}>Loading leaderboard...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="trophy" size={32} color="#FFD700" />
        <Text style={styles.headerText}>Battle Board</Text>
      </View>

      {/* Leaderboard */}
      <FlatList
        data={leaders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Confetti */}
      <ConfettiCannon
        count={150}
        origin={{ x: width / 2, y: 0 }}
        fadeOut
        autoStart={false}
        ref={confettiRef}
      />

      {/* Refresh Button */}
      <TouchableOpacity
        style={styles.refreshBtn}
        onPress={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
      >
        <Ionicons name="refresh" size={20} color="#fff" />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowRadius: 4,
    textShadowOffset: { width: 1, height: 1 },
  },
  card: {
    borderRadius: 16,
    marginVertical: 6,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 6,
  },
  gradientCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  rank: {
    fontSize: 22,
    marginRight: 10,
    color: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#00E5FF",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  points: {
    color: "#A0AEC0",
    fontSize: 13,
  },
  badgeBox: {
    marginLeft: 6,
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  refreshBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    position: "absolute",
    bottom: 25,
    left: "30%",
    right: "30%",
  },
  refreshText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
