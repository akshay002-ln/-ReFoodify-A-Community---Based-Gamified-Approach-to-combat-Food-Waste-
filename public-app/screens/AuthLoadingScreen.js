import React, { useEffect, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";

export default function AuthLoadingScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        setIsLoggedIn(true);
        navigation.replace("Dashboard");
      } else {
        setIsLoggedIn(false);
        navigation.replace("Login");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
