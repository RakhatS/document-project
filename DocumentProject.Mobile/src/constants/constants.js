import {Dimensions} from 'react-native';

export const SERVER_URL = 'localhost';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const tabBarSize = (Math.max(screenWidth, screenHeight) * 10) / 100;

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  openRed: '#7b293d',
  secondRed: '#441c24',
  green: '#7fff01',
};

