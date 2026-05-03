import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function DashboardScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      title: "Active Orders",
      icon: "clipboard-list",
      colors: ["#007AFF", "#00C6FF"],
      route: "Orders",
    },
    {
      title: "Scan QR",
      icon: "qrcode-scan",
      colors: ["#34C759", "#00E676"],
      route: "QRScan",
    },
    {
      title: "Leaderboard",
      icon: "trophy",
      colors: ["#FFD700", "#FFB800"],
      route: "Leaderboard",
    },
    {
      title: "Profile",
      icon: "account",
      colors: ["#8E2DE2", "#4A00E0"],
      route: "Profile",
    },
    {
      title: "Tasks",
      icon: "check-circle-outline",
      colors: ["#00C3FF", "#00A1FF"],
      route: "Tasks",
    },
    {
      title: "Rewards",
      icon: "gift-outline",
      colors: ["#FF512F", "#F09819"],
      route: "Rewards",
    },
  ];

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.header}>Welcome Back 👋</Text>
          <Text style={styles.subheader}>Choose your next mission</Text>

          <View style={styles.grid}>
            {features.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                onPress={() => navigation.navigate(item.route)}
              >
                <LinearGradient
                  colors={item.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.card}
                >
                  <Icon name={item.icon} size={40} color="#fff" />
                  <Text style={styles.cardText}>{item.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.05,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 5,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowRadius: 10,
  },
  subheader: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 140,
    height: 140,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
