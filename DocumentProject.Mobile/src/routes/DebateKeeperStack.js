import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DebateKeeper from '../screens/DebateKeeperScreens/DebateKeeper'
import { HeaderTimeKeeper } from '../components/HeaderTimeKeeper'

const Stack = createStackNavigator()

const DebateKeeperStack = () => {
  return (
    <Stack.Navigator 
    // screenOptions={{headerShown: false}}
    screenOptions={{  header: () => <HeaderTimeKeeper />}}
    >
        <Stack.Screen name='DebateKeeperScreen'  component={DebateKeeper}/>
    </Stack.Navigator>
  )
}

export default DebateKeeperStack

const styles = StyleSheet.create({})