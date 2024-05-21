import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

export const SERVER_URL = 'http://83.97.77.47';

export const LOG_KEY = '4fdFfSkldn@#$&#4e6I';

export const LOCATION_TASK_NAME = 'background-location-task';

export const GOOGLE_API_KEY = 'AIzaSyBkFtXQBtayJiAEVxDJhw4RgiRIvxY_LN4';

export enum COLORS {
  PINK = "#bf599a",
  GRAY1 = "#edeaef",
  MAIN_BLUE = "#422856",
  OPEN_BLUE = "#523b7c",
  WHITE = '#fff',
  BACKGROUND = '#F5F5F5',
  BLACK = '#000',
  BLUE = '#3B65DB',
  BLUE_LIGHT = '#547CEF',
  BLACK_DARK = '#3F3F3F',
  GREEN = '#38B763',
  GRAY_LIGHT = '#E9EDFA',
  BORDER_COLOR = '#C2C2C2',
  GRAY = '#757575',
  OUTLINE = '#FFC048',
  BEIGE_LIGHTEST = '#EDE0D4',
  BEIGE_LIGHTER = '#E6CCB2',
  BEIGE_LIGHT = '#DDB892',
  BEIGE = '#B08968',
  BROWN = '#7F5539',
  BROWN_LIGHT = '#9C6644',
  orange = '#FFC048',
  orange10 = 'rgba(255, 192, 72, 0.1)',
  orange20 = 'rgba(255, 192, 72, 0.2)',
  orange30 = 'rgba(255, 192, 72, 0.3)',
  orange40 = 'rgba(255, 192, 72, 0.4)',
  orange50 = 'rgba(255, 192, 72, 0.5)',
  orange60 = 'rgba(255, 192, 72, 0.6)',
  orange70 = 'rgba(255, 192, 72, 0.7)',
  orange80 = 'rgba(255, 192, 72, 0.8)',
  orange90 = 'rgba(255, 192, 72, 0.9)',
  orange100 = 'rgba(255, 192, 72, 1.0)',
}

export const StatusColors = {
  WAITING: {
    viewColor: '#f2f2f2',
    textColor: '#333333',
  },
  LOADED: {
    viewColor: '#cfe2f3',
    textColor: '#1a4971',
  },
  ONTHEWAY: {
    viewColor: '#d8e4bc',
    textColor: '#3b5e36',
  },
  ATTHEDESTINATION: {
    viewColor: '#fff2cc',
    textColor: '#7f6000',
  },
  FINISHED: {
    viewColor: '#fef3f2',
    textColor: '#b42318',
  },
} as const;

export enum ORDER_STATUS {
  WAITING = 'Waiting',
  LOADED = 'Loaded',
  ONTHEWAY = 'OnTheWay',
  ATTHEDESTINATION = 'AtTheDestination',
  FINISHED = 'Finished',
}

export enum REQUEST_STATUS {
  WAITING = 'Waiting',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  DELETED = 'Deleted',
}

export enum ASYNC_STORAGE {
  ACCESS_TOKEN = 'access_token',
}

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export function validUserName(value: any) {
  return /^[A-Z-.0-9_@]*$/i.test(value);
}

export function validLetter(value: any) {
  return /^[А-Я,Ё,A-Z-'. ]*$/i.test(value);
}

export function validLetterCyrillic(value: any) {
  return /^[А-Я,Ё'. ]*$/i.test(value);
}

export function validLetterLatin(value: string) {
  return /^[A-Z-,'. ]*$/i.test(value);
}

export function validEmail(value: any) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value);
}

export function validPhone(value: any) {
  return /^\+(\d{1,3})[-]?\d{2,4}\-?\d{2,4}-?\d{2}-?\d{2}$/i.test(value);
}

export function validPhoneLetter(value: any) {
  return /^[0-9./А-Я,Ё,A-Z-"'әіңғүұқөһ,+,-, ]*$/i.test(value);
}

export function validHouseNum(value: any) {
  return /^[0-9 a-z а-я / -]*$/i.test(value);
}

export function validLetterNum(value: any) {
  return /^[0-9 /А-Я,Ё,A-Z-"'әіңғүұқөһ ]*$/i.test(value);
}

export const getToken = () => {
  return AsyncStorage.getItem('access_token');
};
export const getOrganizationId = () => {
  return AsyncStorage.getItem('organizationId');
};
export const getRole = () => {
  return AsyncStorage.getItem('role');
};
