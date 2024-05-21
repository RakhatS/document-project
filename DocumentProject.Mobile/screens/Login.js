import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";
import { images, COLORS, SIZES, FONTS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components";

const Login = ({ navigation }) => {
  function renderHeader() {
    return (
      <View style={{ height: SIZES.height > 700 ? "65%" : "60%" }}>
        <ImageBackground
          source={images.loginBackground}
          style={{ flex: 1, justifyContent: "flex-end" }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.8 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: "80%",
                color: COLORS.white,
                lineHeight: 45,
                ...FONTS.largeTitle,
              }}
            >
              {/* Welcome to{" "} */}
              <Text style={{ color: "green", fontSize: 45 }}>Bison</Text>{" "}
              Nutrition
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
        <Text
          style={{
            color: COLORS.gray,
            marginTop: SIZES.radius,
            width: "70%",
            // fontFamily: "RORegular",
            // fontSize: 16,
            ...FONTS.body3,
          }}
        >
          Achieve your nutritional results with our app!
        </Text>
        {/* Buttons - Login and Signup */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* Login */}
          <CustomButton
            buttonText="Login"
            buttonContainerStyle={{ paddingVertical: 18, borderRadius: 20 }}
            colors={["green", COLORS.lime]}
            onPress={() => navigation.navigate("Home")}
          />
          {/* Signup */}
          <CustomButton
            buttonText="Sign Up"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkLime,
              borderWidth: 1,
            }}
            colors={[]}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      {/* Header */}
      {renderHeader()}

      {/* Detail - Login and Signup button */}
      {renderDetail()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
