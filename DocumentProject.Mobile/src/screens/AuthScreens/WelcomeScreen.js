import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View
        style={{ flex: 1, justifyContent: "space-around", marginVertical: 16 }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 32,
            textAlign: "center",
          }}
        >
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../../assets/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={{ marginVertical: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={{
              paddingVertical: 12,
              backgroundColor: "#FFD700",
              marginHorizontal: 16,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#4B5563",
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "bold", color: "#FFD700" }}>
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
