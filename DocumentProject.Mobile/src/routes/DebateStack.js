import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DebateScreen from '../screens/DebateScreens/DebateScreen'
import { HeaderDebate } from '../components/HeaderDebate'

const Stack = createStackNavigator()

const DebateStack = () => {
  return (
    <Stack.Navigator 
    // screenOptions={{  header: () => <HeaderDebate />,}}
    screenOptions={{headerShown:false}}
    >
        <Stack.Screen name='DebateScreen' component={DebateScreen} />
    </Stack.Navigator>
  )
}

export default DebateStack

const styles = StyleSheet.create({})