import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в BetterCargo!</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "rgba(255, 192, 72, 0.4)" }]}
        onPress={() => navigation.navigate("OwnerLogin")}
      >
        <Text style={styles.buttonText}>Я - владелец</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "rgba(255, 192, 72, 0.6)" }]}
        onPress={() => navigation.navigate("DriverLogin")}
      >
        <Text style={styles.buttonText}>Я - водитель</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDE0D4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#7F5539", // Dark brownish-orange
  },
  button: {
    backgroundColor: "rgba(255, 192, 72, 0.4)", // Light orange with transparency
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#7F5539", // Dark brownish-orange
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
