import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../utils/helper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Document Project!</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.PINK }]}
        onPress={() => navigation.navigate("ManagerLoginScreen")}
      >
        <Text style={styles.buttonText}>I am a manager</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.PINK }]}
        onPress={() => navigation.navigate("MemberLoginScreen")}
      >
        <Text style={styles.buttonText}>I am a member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.MAIN_BLUE,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.GRAY1, // Dark brownish-orange
  },
  button: {
    backgroundColor: COLORS.PINK, // Light orange with transparency
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
    color: COLORS.GRAY1, // Dark brownish-orange
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
