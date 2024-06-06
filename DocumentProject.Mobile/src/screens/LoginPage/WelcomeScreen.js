import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { IsSigned } from "../../constants/atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "../../utils/helper";
import { USER_ROLES } from "../../enums";
import { jwtDecode } from "jwt-decode";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setSigned] = useAtom(IsSigned);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleRegister = async () => {
    // await AsyncStorage.setItem("access_token", "fdfadsf");
    // await AsyncStorage.setItem("role", "ROLE_MANAGER");
    // setSigned(true);
    // return;
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
    setIsLoading(true);
    try {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      const response = await fetch(SERVER_URL + "/api/Auth/SignIn", options);
      console.log("response: ", response.ok);
      console.log(response.status);
      const json = await response.json();
      console.log("json: ", json.access_token);
      if (json) {
        const decoded = jwtDecode(json.access_token);
        const userRole =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        console.log(userRole);
        if (userRole == "Member") {
          await AsyncStorage.setItem("role", USER_ROLES.ROLE_MEMBER);
          await AsyncStorage.setItem("access_token", json.access_token);
          setIsLoading(false);

          // console.log(json);
          setSigned(true);
        } else if (userRole == "Manager") {
          await AsyncStorage.setItem("role", USER_ROLES.ROLE_MANAGER);
          await AsyncStorage.setItem("access_token", json.access_token);
          setIsLoading(false);

          // console.log(json);
          navigation.navigate("Organizations");
          // setSigned(true);
        } else if (userRole == "Admin") {
          await AsyncStorage.setItem("role", "Admin");
          await AsyncStorage.setItem("access_token", json.access_token);
          setSigned(true);
          setIsLoading(false);
          navigation.navigate("AdminTab");
          // console.log(json);
        }
      } else {
        setIsLoading(false);
        console.log("Server is error 500");
        Alert.alert(json.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
          name="mail-outline"
          size={24}
          color="#F4A261"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="username@domain.com"
          keyboardType="phone-pad"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {/* <TouchableOpacity>
        <Text style={styles.resendCode}>Send the code again</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("RegistrationScreen")}
      >
        <Text style={styles.registration}>Registration</Text>
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
  resendCode: {
    color: "#6c757d",
    marginVertical: 20,
  },
  signInButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  registration: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
