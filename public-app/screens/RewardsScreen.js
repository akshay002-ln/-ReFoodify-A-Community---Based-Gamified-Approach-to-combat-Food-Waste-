import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";

const API = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function RewardsScreen() {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🎯 Food-Themed Gamified Rewards
  const foodRewards = [
    {
      _id: "1",
      name: "🍔 Burger Master Badge",
      description: "Unlocked after 5 burger orders in a week! Collect your badge!",
      cost: 150,
    },
    {
      _id: "2",
      name: "🥤 Free Drink Combo",
      description: "Redeem a free beverage with your next meal. Stay refreshed!",
      cost: 200,
    },
    {
      _id: "3",
      name: "🍕 Pizza Party Voucher",
      description: "Get 30% off your next pizza order. Share the flavor!",
      cost: 250,
    },
    {
      _id: "4",
      name: "🔥 Spicy Challenge Badge",
      description: "Completed the spicy food challenge? You’ve earned this badge!",
      cost: 300,
    },
    {
      _id: "5",
      name: "🍩 Dessert Loot Box",
      description: "Unlock a surprise dessert treat — donut, brownie, or pastry!",
      cost: 350,
    },
    {
      _id: "6",
      name: "🎁 Chef’s Secret Meal",
      description: "A mystery dish crafted by our top chef. Only for loyal foodies!",
      cost: 400,
    },
    {
      _id: "7",
      name: "💎 Premium Combo Voucher",
      description: "Get a premium meal combo at a discounted price.",
      cost: 500,
    },
    {
      _id: "8",
      name: "🍗 Chicken Lover Badge",
      description: "Earned after trying all chicken varieties in the app!",
      cost: 450,
    },
    {
      _id: "9",
      name: "🚀 Fast Pass Token",
      description: "Skip the queue! Get priority delivery for your next order.",
      cost: 300,
    },
    {
      _id: "10",
      name: "🎖️ Ultimate Foodie Badge",
      description: "Top-tier recognition for completing all food challenges!",
      cost: 600,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const user = await axios.get(`${API}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPoints(user.data.points || 0);
        setRewards(foodRewards);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    })();
  }, []);

  const redeemReward = async (id) => {
    const token = await SecureStore.getItemAsync("token");
    try {
      const res = await axios.post(
        `${API}/api/rewards/redeem`,
        { rewardId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfetti(true);
      Alert.alert("🎉 Reward Redeemed!", res.data.message || "You’ve earned a new reward!");
      setTimeout(() => setConfetti(false), 3000);
    } catch (e) {
      Alert.alert("Error", e.response?.data?.error || "Failed to redeem reward");
    }
  };

  // 🎨 Dynamic Food-Themed Icons
  const getRewardIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("burger"))
      return "https://cdn-icons-png.flaticon.com/512/5787/5787016.png";
    if (lower.includes("drink"))
      return "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
    if (lower.includes("pizza"))
      return "https://cdn-icons-png.flaticon.com/512/3595/3595455.png";
    if (lower.includes("spicy"))
      return "https://cdn-icons-png.flaticon.com/512/3132/3132693.png";
    if (lower.includes("dessert") || lower.includes("donut"))
      return "https://cdn-icons-png.flaticon.com/512/2977/2977169.png";
    if (lower.includes("chef"))
      return "https://cdn-icons-png.flaticon.com/512/2927/2927345.png";
    if (lower.includes("chicken"))
      return "https://cdn-icons-png.flaticon.com/512/857/857681.png";
    if (lower.includes("combo"))
      return "https://cdn-icons-png.flaticon.com/512/1046/1046768.png";
    if (lower.includes("fast"))
      return "https://cdn-icons-png.flaticon.com/512/3132/3132698.png";
    if (lower.includes("foodie") || lower.includes("badge"))
      return "https://cdn-icons-png.flaticon.com/512/2721/2721273.png";
    return "https://cdn-icons-png.flaticon.com/512/4727/4727447.png";
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      {confetti && <ConfettiCannon count={80} origin={{ x: 200, y: -10 }} fadeOut />}
      <Text style={styles.title}>🎮 Food Rewards Vault</Text>
      <Text style={styles.points}>Your XP: {userPoints}</Text>

      <FlatList
        data={rewards}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              styles.cardWrapper,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={index % 2 === 0 ? ["#FF512F", "#DD2476"] : ["#36D1DC", "#5B86E5"]}
              style={styles.card}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: getRewardIcon(item.name) }} style={styles.image} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.cost}>💎 {item.cost} XP</Text>
              </View>

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => redeemReward(item._id)}
              >
                <LinearGradient colors={["#00FF87", "#00C6FF"]} style={styles.button}>
                  <Text style={styles.buttonText}>Redeem</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.noRewards}>No rewards available yet. Stay tuned!</Text>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "#FF4500",
    textShadowRadius: 10,
    marginBottom: 10,
  },
  points: {
    fontSize: 16,
    color: "#00FFFF",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  image: { width: 55, height: 55, borderRadius: 12 },
  name: { fontSize: 17, fontWeight: "700", color: "#fff" },
  desc: { color: "#E0E0E0", fontSize: 13, marginTop: 2 },
  cost: { color: "#FFD700", fontWeight: "700", marginTop: 5, fontSize: 14 },
  buttonWrapper: { marginLeft: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.7,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowRadius: 5,
  },
  noRewards: {
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 30,
  },
});
