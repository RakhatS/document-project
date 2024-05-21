import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ToolsScreen from '../screens/ToolsScreens/ToolsScreen'
import { HeaderTools } from '../components/HeaderTools'

const Stack = createStackNavigator()

const ToolsStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => <HeaderTools />,}}>
        <Stack.Screen name="ToolsScreen" component={ToolsScreen} />
    </Stack.Navigator>
  )
}

export default ToolsStack

const styles = StyleSheet.create({})