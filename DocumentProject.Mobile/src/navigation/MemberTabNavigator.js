import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/Member/HomeScreen";
import ProfileScreen from "../screens/Member/ProfileScreen";
import MainScreen from "../screens/Member/MainScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MemberTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Главная") {
            iconName = "home-outline";
          } else if (route.name == "Profile") {
            iconName = "person-outline";
          }
          return (
            <Icon name={iconName} size={size} color={color} focused={focused} />
          );
        },
        tabBarActiveTintColor: "#2b2b2b",
        headerShown: false,
        //  header: () => <Header />,
      })}
    >
      <Tab.Screen name="Главная" component={MainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MemberTabNavigator;

const styles = StyleSheet.create({});
