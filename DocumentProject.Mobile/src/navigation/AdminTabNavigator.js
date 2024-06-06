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
          if (route.name == "Organizations") {
            iconName = "home-outline";
          } else if (route.name == "Members") {
            iconName = "person-outline";
          } else if (route.name == "Applications") {
            iconName = "document-text-outline";
          } else if (route.name == "Managers") {
            iconName = "document-text-outline";
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
      <Tab.Screen name="Organizations" component={AdminOrganizations} />
      <Tab.Screen name="Members" component={AdminMembers} />
      <Tab.Screen name="Applications" component={AdminApplications} />
      <Tab.Screen name="Managers" component={AdminManagers} />

      <Tab.Screen name="Profile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;

const styles = StyleSheet.create({});
