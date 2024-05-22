import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Motions from './Motions';
import Theories from './Theories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const DebateScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {paddingTop: insets.top }}}>
    <Tab.Screen name="Motions" component={Motions} />
    <Tab.Screen name="Theories" component={Theories} />
  </Tab.Navigator>
  )
}

export default DebateScreen

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})