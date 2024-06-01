import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState("");
  const [image, setImage] = useState(null);

  const uploadPhoto = async (photoBase64) => {
    let access_token = await AsyncStorage.getItem("access_token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({ photoBase64: photoBase64 }),
    };
    const response = await fetch(
      SERVER_URL + "/api/Manager/UploadProfilePhoto",
      options
    );
    console.log("photo sttaus: ", response.status);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      uploadPhoto(result.assets[0].base64);
      setImage(result.assets[0].base64);
    }
  };

  const getCurrent = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    let organizationId = await AsyncStorage.getItem("organizationId");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };
    const response = await fetch(SERVER_URL + "/api/Manager/Current", options);
    const json = await response.json();
    // console.log("json: ", json);
    if (json) {
      setCurrent(json);
    }
    setLoading(false);
  };

  const handleExit = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out", "You have been logged out successfully.");
    navigation.navigate("Welcome"); // Change "Login" to your login screen route name
  };

  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/fon.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => pickImage()}
        >
          <Image
            source={
              current?.photoBase64 == ""
                ? require("../../../assets/driver.png")
                : { uri: `data:image/jpeg;base64,${current?.photoBase64}` }
            }
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {current?.firstName} {current?.lastName}
          </Text>
          <Text style={styles.statisticsTitle}>Document Statistics</Text>
          <Text style={styles.statistics}>Total Documents: 10</Text>
          <Text style={styles.statistics}>Signed Documents: 5</Text>
          <Text style={styles.statistics}>Pending Documents: 5</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExit}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Organizations")}
        >
          <Text style={styles.buttonText}>Change Organizations</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.DARK_BLUE,
  },
  profileInfo: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  statistics: {
    fontSize: 16,
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },
  button: {
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
});
