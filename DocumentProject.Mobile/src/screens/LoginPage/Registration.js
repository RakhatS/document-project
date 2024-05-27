import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { USER_ROLES } from "../../enums";
import { useNavigation } from "@react-navigation/native";
import { SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const emailValid = validateEmail(email);
    if (emailValid == null) {
      Alert.alert(
        "Email is incorrect!",
        `- The email address must be in the format "username@domain.com"
        
        - Must not contain spaces
       
        - Must contain the "@" symbol
       
        - Some special characters may be allowed, but are usually limited by the rules of a particular email provider`
      );
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
    console.log(userData);

    setIsLoading(true);

    try {
      const response = await fetch(SERVER_URL + "/api/Auth/Manager/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigation.goBack();
        Alert.alert("Success", "Registration successful");
      } else {
        Alert.alert("Error", result.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ height: 200, width: "90%" }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.subtitle}>
        Design and implementation of a web platform for an automated workflow
        process
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#ccc"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#ccc"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#F4A261"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholderTextColor="#ccc"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#F4A261"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#264653",
    marginLeft: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#6c757d",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    width: "80%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RegistrationScreen;
