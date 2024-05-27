import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

export const SERVER_URL = "https://5cc3-178-89-169-105.ngrok-free.app";

export enum COLORS {
  LIGHT_BLUE = "#CADCFC",
  MEDIUM_BLUE = "#8AB6F9",
  DARK_BLUE = "#00246B",
  BACKGROUND = "#F5F5F5",
}

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;

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
  return AsyncStorage.getItem("access_token");
};
export const getOrganizationId = () => {
  return AsyncStorage.getItem("organizationId");
};
export const getRole = () => {
  return AsyncStorage.getItem("role");
};
