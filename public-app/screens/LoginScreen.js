import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(30)).current;
  const glowOpacity = useRef(new Animated.Value(0.25)).current;

  // ✨ Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.25, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // 🧠 Handle Login (Student-only)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }

    try {
      await login(email, password);
      Alert.alert("✅ Login Successful", "Welcome back!");
      navigation.replace("Main"); // Goes to student dashboard
    } catch (err) {
      console.log("❌ Login failed:", err.response?.data || err.message);
      Alert.alert("Login failed", err.response?.data?.error || "Invalid credentials or network issue.");
    }
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.centerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Logo */}
        <Animated.View
          style={[{ opacity: fadeAnim, transform: [{ translateY: slideY }] }, styles.logoWrapper]}
        >
          <Image
            source={{
              uri: "https://as2.ftcdn.net/jpg/02/59/38/43/1000_F_259384390_LZjy7LNM3zeLSXMILA0NphvmOzUQXSuj.jpg",
            }}
            style={styles.logo}
          />
        </Animated.View>

        {/* Card */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideY }] }]}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to your Smart Canteen account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0AEC0"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0AEC0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Glow button */}
          <View style={styles.glowContainer}>
            <Animated.View
              pointerEvents="none"
              style={[StyleSheet.absoluteFill, { opacity: glowOpacity, borderRadius: 10 }]}
            >
              <LinearGradient
                colors={["rgba(0,229,255,0.16)", "rgba(0,122,255,0.12)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>

            <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Don’t have an account? Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logoWrapper: { marginBottom: 18, alignItems: "center" },
  logo: { width: 96, height: 96, borderRadius: 20, backgroundColor: "transparent" },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#00E5FF",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: { fontSize: 13, color: "#A0AEC0", textAlign: "center", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
  },
  glowContainer: { marginTop: 6, marginBottom: 10, borderRadius: 10 },
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  link: { marginTop: 12, color: "#00E5FF", textAlign: "center", fontSize: 14 },
});
