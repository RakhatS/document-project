import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SERVER_URL } from "../../utils/helper";
import { useNavigation } from "@react-navigation/native";

const AdminProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");

  const handleExit = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out", "You have been logged out successfully.");
    navigation.navigate("Welcome"); // Change "Login" to your login screen route name
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      let access_token = await AsyncStorage.getItem("access_token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await fetch(SERVER_URL + "/api/Admin/Current", options);
      const json = await response.json();
      if (json) {
        setProfile(json);
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setEmail(json.email);
        setPosition(json.position);
        setAddress(json.address);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        position,
        address,
      }),
    };
    const response = await fetch(SERVER_URL + "/api/Admin/Update", options);
    const json = await response.json();
    if (json) {
      setProfile(json);
      setIsEditing(false);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={100}
          label={profile.firstName ? profile.firstName.charAt(0) : ""}
        />
        <Title style={styles.title}>
          {profile.firstName} {profile.lastName}
        </Title>
        <Caption style={styles.caption}>{profile.position}</Caption>
      </View>

      <View style={styles.infoSection}>
        {isEditing ? (
          <>
            <TextInput
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              label="Position"
              value={position}
              onChangeText={setPosition}
              style={styles.input}
            />
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSave} style={styles.button}>
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => setIsEditing(false)}
              style={styles.button}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>First Name: </Text>
              <Text style={styles.value}>{profile.firstName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Name: </Text>
              <Text style={styles.value}>{profile.lastName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Position: </Text>
              <Text style={styles.value}>{profile.position}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.value}>{profile.address}</Text>
            </View>
            <Button
              mode="contained"
              onPress={() => setIsEditing(true)}
              style={styles.button}
            >
              Edit Profile
            </Button>

            <Button
              mode="contained"
              onPress={() => handleExit()}
              style={styles.button}
            >
              Exit Profile
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 10,
    paddingTop: 65,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  infoSection: {
    padding: 20,
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
  },
  value: {
    color: COLORS.DARK_BLUE,
  },
  input: {
    marginBottom: 10,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  button: {
    marginTop: 10,
  },
});

export default AdminProfile;
