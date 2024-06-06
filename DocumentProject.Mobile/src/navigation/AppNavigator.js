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
import { SERVER_URL } from "../utils/helper";
import CreateApplication from "../screens/Manager/CreateApplication";
import CurrentApplication from "../screens/Manager/CurrentApplication";
import { useNavigation } from "@react-navigation/native";
import Organizations from "../screens/Manager/Organizations";
import Drivers from "../screens/Manager/Drivers";
import CreateDriver from "../screens/Manager/CreateDriver";
import RegistrationScreen from "../screens/LoginPage/Registration";
import OnlineSigningSystem from "../screens/Manager/OnlineSystem";
import AboutUs from "../screens/Member/AboutUs";
import MemberNotifications from "../screens/Member/MemberNotifications";
import ManagerNotifications from "../screens/Manager/ManagerNotification";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [signed, setSigned] = useAtom(IsSigned);
  const [role, setRole] = useState("");
  const naviagtion = useNavigation();

  useEffect(() => {
    const getid = async () => {
      let token = await AsyncStorage.getItem("access_token");
      let role = await AsyncStorage.getItem("role");

      if (token && role) {
        setSigned(true);
        setRole(role);
        console.log("Token: ", token);
        console.log("Role: ", role);
        if (role == USER_ROLES.ROLE_MANAGER) {
          naviagtion.navigate("ManagerTab");
        } else {
          naviagtion.navigate("MemberTab");
        }
      } else {
        setRole("Login");
        setSigned(false);
      }
    };
    getid();
  }, [signed]);

  useEffect(() => {
    const getCheck = async () => {
      console.log(SERVER_URL + "/api/HealthCheck");
      const response = await fetch(SERVER_URL + "/api/HealthCheck");
      // const json = await response.json();
      console.log("getCheck:  ", response.status);
    };

    getCheck();
  }, []);

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
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            header: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="OnlineSigningSystem"
          component={OnlineSigningSystem}
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
        <Stack.Screen
          name="CreateApplication"
          component={CreateApplication}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CurrentApplication"
          component={CurrentApplication}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Organizations"
          component={Organizations}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Drivers"
          component={Drivers}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CreateDriver"
          component={CreateDriver}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="MemberNotifications"
          component={MemberNotifications}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="ManagerNotifications"
          component={ManagerNotifications}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
