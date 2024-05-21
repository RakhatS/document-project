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
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import { useNavigation } from "@react-navigation/native";
import { USER_ROLES } from "../../enums";
import { IsSigned } from "../../constants/atom";

const ManagerLoginScreen = () => {
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
    const emailValid = validateEmail(email);
    if (emailValid == null) {
      // console.log('email is not valid!');
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

      // console.log(options.body);

      const response = await fetch(
        SERVER_URL + "/api/OwnerAuth/Login",
        options
      );
      console.log("response: ", response.ok);
      console.log(response.status);
      const json = await response.json();
      // console.log('json: ', json);
      if (json.isSuccess == true) {
        await AsyncStorage.setItem("role", USER_ROLES.ROLE_OWNER);
        await AsyncStorage.setItem("access_token", json.data.access_token);
        setIsLoading(false);
        // console.log(json);
        navigation.navigate("Organizations");
        setSigned(true);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ alignItems: "center" }}>
            {/* <Image
              source={require("../../assets/icon2x.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            /> */}

            <Text style={styles.title}>Document Project</Text>
          </View>

          <View
            style={{ width: "100%", paddingTop: 10, paddingHorizontal: 20 }}
          >
            <Text style={styles.inputText}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Эл.  почта"
              placeholderTextColor={"#8e8e8e"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor={"#8e8e8e"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            // onPress={() => handleRegister()}
            onPress={async () => {
              await AsyncStorage.setItem("access_token", "fdfadsf");
              await AsyncStorage.setItem("role", "ROLE_MANAGER");
              setSigned(true);
            }}
          >
            {isLoading ? (
              <ActivityIndicator size={20} color={COLORS.orange} />
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
    backgroundColor: COLORS.orange,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#000000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    marginLeft: 8,
    fontSize: 18,
    color: "#2F2E41",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F2E41",
    paddingVertical: 15,
    paddingHorizontal: 50,
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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  inputText: {
    fontWeight: "600",
    fontSize: 25,
    lineHeight: 23,
    color: "#2F2E41",
    marginBottom: 5,
  },
});

export default ManagerLoginScreen;
