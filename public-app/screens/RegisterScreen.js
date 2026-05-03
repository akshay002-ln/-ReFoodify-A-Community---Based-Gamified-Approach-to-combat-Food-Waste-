import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(30)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Smooth intro animation
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    // Neon pulse effect on button
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing info", "Please fill all fields");
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#111827"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.centerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 🔹 Animated App Logo */}
        <Animated.View
          style={[{ opacity: fadeAnim, transform: [{ translateY: slideY }] }, { alignItems: "center", marginBottom: 20 }]}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
            }}
            style={styles.logo}
          />
        </Animated.View>

        {/* 🔹 Glassmorphic Registration Card */}
        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim, transform: [{ translateY: slideY }] },
          ]}
        >
          <Text style={styles.title}>Create Account ✨</Text>
          <Text style={styles.subtitle}>Join the canteen app community</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#A0AEC0"
            value={name}
            onChangeText={setName}
          />
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

          {/* 🔹 Animated Glow Sign-Up Button */}
          <View style={styles.glowContainer}>
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { opacity: glowOpacity, borderRadius: 10, overflow: "hidden" },
              ]}
            >
              <LinearGradient
                colors={["rgba(0,229,255,0.18)", "rgba(0,122,255,0.12)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    resizeMode: "contain",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#00E5FF",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#00E5FF",
    textAlign: "center",
    marginBottom: 5,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#A0AEC0",
    textAlign: "center",
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
  },
  glowContainer: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  link: {
    marginTop: 15,
    color: "#00E5FF",
    textAlign: "center",
    fontSize: 14,
  },
});