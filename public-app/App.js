import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View, Text } from "react-native";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import OrdersScreen from "./screens/OrdersScreen";
import QRScannerScreen from "./screens/QRScannerScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TasksScreen from "./screens/TasksScreen";
import RewardsScreen from "./screens/RewardsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 🌈 Optional custom dark theme for smooth background transitions
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0F172A",
  },
};


// 🧭 Bottom Tabs Navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 65,
          position: "absolute",
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Orders":
              iconName = focused ? "clipboard-list" : "clipboard-list-outline";
              break;
            case "QRScan":
              iconName = focused ? "qrcode-scan" : "qrcode";
              break;
            case "Leaderboard":
              iconName = focused ? "trophy" : "trophy-outline";
              break;
            case "Profile":
              iconName = focused ? "account" : "account-outline";
              break;
            case "Tasks":
              iconName = focused ? "check-circle" : "check-circle-outline";
              break;
            case "Rewards":
              iconName = focused ? "gift" : "gift-outline";
              break;
            default:
              iconName = "circle";
          }
          return (
            <Icon name={iconName} size={30} color={focused ? "#007AFF" : "#999"} />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="QRScan" component={QRScannerScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
    </Tab.Navigator>
  );
}


// 🔐 Main App Navigator (Handles auth state + splash)
function AppNavigator() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // 🧹 TEMP FIX: clear stored token once to see Login screen
  useEffect(() => {
    SecureStore.deleteItemAsync("token");
  }, []);

  // Splash screen animation delay
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Check stored token on startup
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setIsLoggedIn(!!token);
      } catch (err) {
        console.log("Token check error:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  // 🕹️ Show splash first
  if (showSplash) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <Text style={{ color: "#00E5FF", fontSize: 26, fontWeight: "bold" }}>
          🍽️ Smart Canteen
        </Text>
      </View>
    );
  }

  // 🔄 While checking token
  if (isLoggedIn === null || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: "#555" }}>Checking session...</Text>
      </View>
    );
  }

  // ✅ Navigation flow based on login state
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// 🚀 Root App
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
