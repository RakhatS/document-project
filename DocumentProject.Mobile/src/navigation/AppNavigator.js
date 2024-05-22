import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { IsSigned } from "../constants/atom";
import WelcomeScreen from "../screens/LoginPage/WelcomeScreen";
import MemberTabNavigator from "./MemberTabNavigator";
import MemberLoginScreen from "../screens/LoginPage/MemberLoginScreen";
import ManagerLoginScreen from "../screens/LoginPage/ManagerLoginScreen";
import { USER_ROLES } from "../enums";

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
          role == USER_ROLES.ROLE_MEMBER
            ? "MemberTab"
            : role == USER_ROLES.ROLE_MANAGER
            ? "ManagerTab"
            : "Welcome"
        }
        screenOptiorrns={{
          cardStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Stack.Screen
          name="ManagerTab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemberTab"
          component={MemberTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            header: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="MemberLoginScreen"
          component={MemberLoginScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="ManagerLoginScreen"
          component={ManagerLoginScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
