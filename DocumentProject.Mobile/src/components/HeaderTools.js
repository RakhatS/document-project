import {React, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import GradientText from './GradientText';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const HeaderTools = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GradientText style={styles.textStyle}>Qazaq Debate</GradientText>
      <View style={{position: 'absolute', right: 10}}>
        <Text style={{color:'red'}}>kaz</Text>
        <Text style={{color:'red'}}>rus</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff', 
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },

  textStyle: {
    fontSize: 36,
    fontWeight: '400',
    marginVertical: 10,
    fontFamily: 'MontserratAlternates-Medium',
  },
});

