import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import { useNavigation } from "@react-navigation/native";
import { USER_ROLES } from "../../enums";
import { IsSigned } from "../../constants/atom";

const MemberLoginScreen = () => {
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

  const handleLogin = async () => {
    await AsyncStorage.setItem("access_token", "fdfadsf");
    await AsyncStorage.setItem("role", "ROLE_MEMBER");
    setSigned(true);
    return;
    const emailValid = validateEmail(email);
    if (emailValid == null) {
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
          Email: email,
          Password: password,
        }),
      };
      const response = await fetch(
        SERVER_URL + "/api/DriverAuth/Login",
        options
      );
      const json = await response.json();
      if (json.isSuccess == true) {
        setIsLoading(false);
        await AsyncStorage.setItem("role", USER_ROLES.ROLE_DRIVER);
        await AsyncStorage.setItem("access_token", json.data.access_token);
        navigation.navigate("DriverTab");
        setSigned(true);
      } else {
        setIsLoading(false);
        Alert.alert(json.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Document Project</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.DARK_BLUE}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.DARK_BLUE}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            {isLoading ? (
              <ActivityIndicator size={20} color={COLORS.LIGHT_BLUE} />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.DARK_BLUE,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20,
    color: COLORS.DARK_BLUE,
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_BLUE,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.MEDIUM_BLUE,
    paddingVertical: 15,
    paddingHorizontal: 50,
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "600",
    textAlign: "center",
  },
  inputText: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },
});

export default MemberLoginScreen;
