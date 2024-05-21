import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Login, Recipe } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   ROBlack: require("./assets/fonts/Roboto-Black.ttf"),
  //   RORegular: require("./assets/fonts/Roboto-Regular.ttf"),
  //   ROBold: require("./assets/fonts/Roboto-Bold.ttf"),
  // });

  // This was my error:
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
