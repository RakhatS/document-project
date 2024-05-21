// App.js
import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TimerScreen() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTimer(0);
  };

  const toggleTimer = () => {
    if (isActive) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timer Screen</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="ios-notifications"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Ionicons
            name="ios-refresh"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Ionicons
            name="ios-options"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>
      <Text style={styles.timer}>{timer}s</Text>
      <View style={styles.buttonContainer}>
        {isActive ? (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        {!isActive && (
          <TouchableOpacity style={styles.button} onPress={toggleTimer}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});
