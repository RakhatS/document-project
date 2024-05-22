import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "MontserratAlternates-Medium": require("./assets/Fonts/MontserratAlternates-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar barStyle="dark-content" backgroundColor={"red"} />
      </NavigationContainer>
    </PaperProvider>
  );
}
