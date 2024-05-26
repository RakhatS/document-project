import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import {
  Avatar,
  Button,
  RadioButton,
  Text,
  TextInput,
} from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  COLORS,
  SERVER_URL,
  getOrganizationId,
  getToken,
} from "../../utils/helper";
import Icon from "react-native-vector-icons/Ionicons";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreateDriver = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [Loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carMark, setCarMark] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const isAnyRadioButtonSelected = () => {
    return (
      !!lastName &&
      !!firstName &&
      !!number &&
      !!email &&
      !!password &&
      !!carMark
    );
  };

  const onPressContinue = async () => {
    if (
      !lastName ||
      !firstName ||
      !number ||
      !email ||
      !password ||
      !carMark ||
      !carMark
    ) {
      Alert.alert("Пожалуйста, заполните все необходимые поля");
      return;
    }

    setLoading(true);

    const emailValid = validateEmail(email);
    if (emailValid == null) {
      Alert.alert(
        "Email is incorrect!",
        `- The email address must be in the format "username@domain.com"
        
        - Must not contain spaces
       
        - Must contain the "@" symbol
       
        - Some special characters may be allowed, but are usually limited by the rules of a particular email provider`
      );
      setLoading(false);
      return;
    }

    let access_token = await AsyncStorage.getItem("access_token");
    // let organizationId = await getOrganizationId("organizationId");
    const newDriver = {
      lastName: lastName,
      firstName: firstName,
      position: number,
      email: email,
      password: password,
      address: carMark,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(newDriver),
    };
    // console.log(newDriver);

    try {
      const response = await fetch(
        SERVER_URL + "/api/Organization/CreateDriver",
        options
      );
      console.log("CreateDriver: ", response.status);
      const json = await response.json();
      if (json.isSuccess == true) {
        console.log(json);
        setLoading(false);
        navigation.goBack();
      } else {
        console.log(json);
        Alert.alert(json.message);
      }
    } catch (error) {
      Alert.alert("Пожалуйста, заполните все необходимые поля");
      console.log("CreateDriver error: ", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.innerSecondContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                marginTop: 15,
                marginBottom: 5,
                color: "#000000",
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Create a new member
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="close" color={COLORS.MEDIUM_BLUE} size={35} />
            </TouchableOpacity>
          </View>

          <TextInput
            label="Lastname"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Firstname"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Position"
            value={number}
            onChangeText={(text) => setNumber(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Address"
            value={carMark}
            onChangeText={(text) => setCarMark(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            activeOutlineColor={COLORS.OUTLINE}
            mode="outlined"
            style={styles.input}
            textColor="#000000"
          />
        </View>

        <View style={styles.innerSecondContainer}>
          <Button
            disabled={!isAnyRadioButtonSelected()}
            onPress={onPressContinue}
            style={
              isAnyRadioButtonSelected()
                ? styles.continueButton
                : styles.disabled
            }
            loading={Loading}
            mode="contained"
          >
            Create
          </Button>
        </View>
        <View style={styles.innerSecondContainer}>
          <Button
            onPress={() => navigation.goBack()}
            style={styles.continueButton}
            mode="contained"
          >
            Назад
          </Button>
        </View>
        <View style={{ marginBottom: 100 }} />
      </View>
    </ScrollView>
  );
};

export default CreateDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  innerContainer: {
    width: "100%",
    marginBottom: 12,
    paddingBottom: 12,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    paddingRight: 16,
    paddingLeft: 16,
  },
  innerSecondContainer: {
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    paddingRight: 16,
    paddingLeft: 16,
  },
  innerFooter: {
    width: "100%",
    marginBottom: -12,
    backgroundColor: "#FFFFFF",
    paddingRight: 16,
    paddingLeft: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginTop: 24,
    marginBottom: 12,
  },
  labelSubtitle: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "#49454F",
  },
  labelTitle: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: "#828282",
    marginTop: 24,
  },
  wasteWeightText: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginBottom: 16,
  },
  input: {
    height: 45,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  wasteWeightInput: {
    margin: 16,
  },
  continueButton: {
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: COLORS.MEDIUM_BLUE,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  changeText: {
    color: COLORS.MEDIUM_BLUE,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  wasteTypeButton: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 16,
  },
  weightButton: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  weightButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto",
    fontWeight: "400",
    color: COLORS.MEDIUM_BLUE,
  },
  inputModal: {
    backgroundColor: "#E5E5E5",
    width: "100%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  wasteTypeModalBackground: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  wasteTypeModalContent: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
  successModalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 36,
    marginHorizontal: 10,
  },
  modalHeaderTextContainer: {
    height: 37,
    backgroundColor: "#EEEEEE",
    marginTop: 12,
    justifyContent: "center",
  },
  modalHeaderText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    color: "#49454F",
    marginLeft: 16,
  },
  modalHeader: {
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 32,
    color: "#1D1B20",
  },
  modalHeaderSubtitle: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    color: "#49454F",
  },
  textButtonText: {
    marginTop: 24,
    textAlign: "right",
    fontSize: 16,
    color: COLORS.MEDIUM_BLUE,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 22,
    marginLeft: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingLeft: 16,
    paddingRight: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    margin: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  disabled: {
    backgroundColor: "#E8E8E8",
    margin: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  kgText: {
    marginRight: 20,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    color: "#1D1B20",
  },
  tonText: {
    marginRight: 20,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    color: "#1D1B20",
  },
});
