import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Animated,
  Easing,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const API = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:4000";

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const animatedLine = new Animated.Value(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedLine, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedLine, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    Vibration.vibrate(150);
    try {
      const res = await axios.post(`${API}/api/qr/scan`, { token: data });
      alert(res.data.message || "QR validated successfully ✅");
    } catch (e) {
      alert(e.response?.data?.error || "Invalid or expired QR ❌");
    } finally {
      setTimeout(() => setScanned(false), 2000);
    }
  };

  if (hasPermission === null)
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );

  if (hasPermission === false)
    return (
      <View style={styles.center}>
        <Icon name="camera-off-outline" size={50} color="#999" />
        <Text style={{ marginTop: 10 }}>Camera access denied</Text>
      </View>
    );

  const translateY = animatedLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Dark overlay */}
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          {/* Corner borders */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Animated scanning line */}
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY }] },
            ]}
          />
        </View>

        {/* Instructions */}
        <View style={styles.bottomPanel}>
          <Text style={styles.instruction}>Align the QR code within the frame</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setScanned(false)}
            disabled={!scanned}
          >
            <Text style={styles.btnText}>
              {scanned ? "Tap to Scan Again" : "Ready to Scan"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  scanArea: {
    width: 260,
    height: 260,
    borderRadius: 20,
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  scanLine: {
    width: "90%",
    height: 2,
    backgroundColor: "#00FFB2",
    position: "absolute",
    top: 0,
  },

  corner: {
    width: 30,
    height: 30,
    borderColor: "#00FFB2",
    position: "absolute",
  },
  topLeft: { top: 0, left: 0, borderLeftWidth: 3, borderTopWidth: 3 },
  topRight: { top: 0, right: 0, borderRightWidth: 3, borderTopWidth: 3 },
  bottomLeft: { bottom: 0, left: 0, borderLeftWidth: 3, borderBottomWidth: 3 },
  bottomRight: { bottom: 0, right: 0, borderRightWidth: 3, borderBottomWidth: 3 },

  bottomPanel: {
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },

  instruction: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
