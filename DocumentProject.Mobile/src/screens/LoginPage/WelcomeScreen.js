import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../utils/helper"; // Ensure COLORS object has LIGHT_BLUE, MEDIUM_BLUE, and DARK_BLUE

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Document Project!</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.MEDIUM_BLUE }]}
        onPress={() => navigation.navigate("ManagerLoginScreen")}
      >
        <Text style={styles.buttonText}>I am a manager</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.MEDIUM_BLUE }]}
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
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: COLORS.DARK_BLUE,
  },
  button: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: COLORS.DARK_BLUE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
