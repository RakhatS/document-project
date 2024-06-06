import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AdminApplications from "../screens/Admin/AdminApplications";
import AdminManagers from "../screens/Admin/AdminManagers";
import AdminMembers from "../screens/Admin/AdminMembers";
import AdminOrganizations from "../screens/Admin/AdminOrganizations";
import AdminProfile from "../screens/Admin/AdminProfile";

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "home-outline";
          } else if (route.name == "Profile") {
            iconName = "person-outline";
          } else if (route.name == "Applications") {
            iconName = "document-text-outline";
          } else if (route.name == "Profile") {
            iconName = "person-outline";
          } else if (route.name == "Applications") {
            iconName = "document-text-outline";
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
      <Tab.Screen name="AdminApplications" component={AdminApplications} />
      <Tab.Screen name="AdminManagers" component={AdminManagers} />
      <Tab.Screen name="AdminMembers" component={AdminMembers} />
      <Tab.Screen name="AdminOrganizations" component={AdminOrganizations} />
      <Tab.Screen name="AdminProfile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;

const styles = StyleSheet.create({});
