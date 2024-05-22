import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/Manager/HomeScreen";
import ProfileScreen from "../screens/Manager/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
