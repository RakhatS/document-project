import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../routes/HomeStack";
import ToolsStack from "../routes/ToolsStack";
import DebateStack from "../routes/DebateStack";
import DebateKeeperStack from "../routes/DebateKeeperStack";
import Icon from "react-native-vector-icons/Ionicons";
import { tabBarSize } from "../constants/constants";

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
          } else if (route.name == "Time Keeper") {
            iconName = "alarm-outline";
          } else if (route.name == "Дебаты") {
            iconName = "documents-outline";
          } else if (route.name == "Инструменты") {
            iconName = "apps-outline";
          }
          return (
            <Icon name={iconName} size={size} color={color} focused={focused} />
          );
        },
        // tabBarLabel: ({ focused }) => {
        //   return <Text style={{fontSize: 14, fontWeight: '600'}}>{focused ? route.name : ""}</Text>
        // },
        // tabBarStyle: {
        //   borderTopWidth: 1,
        //   borderColor: '#D9D9D9',
        //   paddingBottom: 10,
        //   height: tabBarSize-15,

        // },
        tabBarActiveTintColor: "#2b2b2b",
        //  tabBarShowLabel: false,
        headerShown: false,
        //  header: () => <Header />,
      })}
    >
      <Tab.Screen name="Главная" component={HomeStack} />
      <Tab.Screen name="Дебаты" component={DebateStack} />
      <Tab.Screen name="Time Keeper" component={DebateKeeperStack} />
      <Tab.Screen name="Инструменты" component={ToolsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
