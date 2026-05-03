import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";

const API = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const res = await axios.get(`${API}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(
          res.data.length
            ? res.data
            : [
                {
                  _id: "1",
                  restaurantId: "Campus Canteen",
                  totalAmount: 80,
                  status: "paid",
                  createdAt: new Date(),
                },
                {
                  _id: "2",
                  restaurantId: "Food Zone",
                  totalAmount: 120,
                  status: "awaiting_feedback",
                  createdAt: new Date(),
                },
                {
                  _id: "3",
                  restaurantId: "Café Delight",
                  totalAmount: 60,
                  status: "completed",
                  createdAt: new Date(),
                },
              ]
        );
      } catch (err) {
        console.log("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    };
    fetchOrders();
  }, []);

  const getGradientColors = (status) => {
    switch (status) {
      case "paid":
        return ["#007AFF", "#00C6FF"];
      case "awaiting_feedback":
        return ["#FF8C00", "#FFB300"];
      case "completed":
        return ["#16A34A", "#4ADE80"];
      default:
        return ["#6B7280", "#9CA3AF"];
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "paid":
        return "credit-card-check-outline";
      case "awaiting_feedback":
        return "message-text-outline";
      case "completed":
        return "check-decagram-outline";
      default:
        return "clock-outline";
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ marginTop: 10, color: "#ccc" }}>Loading Orders...</Text>
      </View>
    );

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      <Text style={styles.title}>Active Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.center}>
          <Icon name="clipboard-text-off-outline" size={60} color="#9CA3AF" />
          <Text style={{ color: "#aaa", marginTop: 10 }}>No active missions yet.</Text>
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
            renderItem={({ item, index }) => {
              const gradient = getGradientColors(item.status);
              return (
                <LinearGradient colors={gradient} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Icon name={getIcon(item.status)} size={28} color="#fff" />
                    <Text style={styles.cardTitle}>
                      {item.restaurantId || "Canteen"}
                    </Text>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.infoBox}>
                      <Icon name="currency-inr" size={16} color="#fff" />
                      <Text style={styles.text}> {item.totalAmount}</Text>
                    </View>

                    <View style={styles.infoBox}>
                      <Icon name="clock-outline" size={16} color="#fff" />
                      <Text style={styles.text}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.statusContainer}>
                    <Text style={styles.status}>
                      {item.status.replace("_", " ").toUpperCase()}
                    </Text>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowRadius: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { color: "#fff", fontWeight: "600", marginLeft: 4 },
  statusContainer: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  status: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 13,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
