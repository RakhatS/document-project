import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";

const ProfileScreen = ({ navigation }) => {
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(false);

  const getCurrent = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    let organizationId = await AsyncStorage.getItem("organizationId");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };
    const response = await fetch(SERVER_URL + "/api/Manager/Current", options);
    const json = await response.json();
    console.log("json: ", json);
    if (json) {
      setCurrent(json);
    }
    setLoading(false);
  };

  const handleExit = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out", "You have been logged out successfully.");
    navigation.navigate("Login"); // Change "Login" to your login screen route name
  };

  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>
          {current?.firstName} {current?.lastName}
        </Text>
        <Text style={styles.statisticsTitle}>Document Statistics</Text>
        <Text style={styles.statistics}>Total Documents: 10</Text>
        <Text style={styles.statistics}>Signed Documents: 5</Text>
        <Text style={styles.statistics}>Pending Documents: 5</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleExit}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChangeOrganizations")}
      >
        <Text style={styles.buttonText}>Change Organizations</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.DARK_BLUE,
  },
  profileInfo: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  statistics: {
    fontSize: 16,
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },
  button: {
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
});
