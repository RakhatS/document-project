import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";
import TimerScreen from "../screens/DebateKeeperScreens/TimerScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tournament from "../screens/HomeScreens/Tournament";
import Coin from "../screens/ToolsScreens/Coin";
import { useAtom } from "jotai";
import { IsSigned } from "../constants/atom";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [signed, setSigned] = useAtom(IsSigned);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getid = async () => {
      let token = await AsyncStorage.getItem("access_token");
      let role = await AsyncStorage.getItem("role");
      // // console.log('Token: ', token);
      // // console.log('Role: ', role);
      if (token && role) {
        setSigned(true);
        setRole(role);
      } else {
        setRole("Login");
        setSigned(false);
      }
    };
    getid();
  }, [signed]);

  if (role == "") {
    return null;
  } else
    return (
      <Stack.Navigator
        initialRouteName={
          role == "USER_ROLES.ROLE_DRIVER"
            ? "DriverTab"
            : role == "USER_ROLES.ROLE_OWNER"
            ? "OwnerTab"
            : "Welcome"
        }
        screenOptions={{
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimerScreen"
          component={TimerScreen}
          options={({ route }) => ({ title: route.params })}
        />
        <Stack.Screen
          name="Tournament"
          component={Tournament}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Coin"
          component={Coin}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
