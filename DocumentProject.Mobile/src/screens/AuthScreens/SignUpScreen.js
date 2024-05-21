import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { themeColors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#FFD700",
              padding: 10,
              borderRadius: 20,
              marginLeft: 16,
            }}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../../assets/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 2.5,
          backgroundColor: "white",
          paddingHorizontal: 16,
          paddingTop: 16,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "#4B5563", marginLeft: 16 }}>Full Name</Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: "#D1D5DB",
              color: "#4B5563",
              borderRadius: 20,
              marginBottom: 8,
            }}
            value="john snow"
            placeholder="Enter Name"
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "#4B5563", marginLeft: 16 }}>
            Email Address
          </Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: "#D1D5DB",
              color: "#4B5563",
              borderRadius: 20,
              marginBottom: 8,
            }}
            value="john@gmail.com"
            placeholder="Enter Email"
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "#4B5563", marginLeft: 16 }}>Password</Text>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: "#D1D5DB",
              color: "#4B5563",
              borderRadius: 20,
              marginBottom: 24,
            }}
            secureTextEntry
            value="test12345"
            placeholder="Enter Password"
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: "#FFD700",
            borderRadius: 20,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#4B5563",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#4B5563",
            marginBottom: 40,
          }}
        >
          Or
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: "#D1D5DB",
              borderRadius: 20,
              marginRight: 12,
            }}
          >
            <Image
              source={require("../../../assets/google.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: "#D1D5DB",
              borderRadius: 20,
              marginRight: 12,
            }}
          >
            <Image
              source={require("../../../assets/apple.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: "#D1D5DB",
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../../../assets/facebook.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#6B7280", fontWeight: "bold" }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold", color: "#FFD700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
