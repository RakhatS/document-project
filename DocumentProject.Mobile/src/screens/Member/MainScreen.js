import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";

const Tab = createMaterialTopTabNavigator();

const MainScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Текущие" component={HomeScreen} />
        <Tab.Screen name="История" component={HistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
