import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/Manager/HomeScreen";
import ProfileScreen from "../screens/Manager/ProfileScreen";
import Drivers from "../screens/Manager/Drivers";
import DocumentTemplates from "../screens/Manager/DocumentTemplates";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Document Storage") {
            iconName = "receipt-outline";
          } else if (route.name == "Profile") {
            iconName = "person-outline";
          } else if (route.name == "Members") {
            iconName = "accessibility-outline";
          } else if (route.name == "Document Templates") {
            iconName = "document-outline";
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
      <Tab.Screen name="Document Templates" component={DocumentTemplates} />
      <Tab.Screen name="Document Storage" component={HomeScreen} />
      <Tab.Screen name="Members" component={Drivers} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
