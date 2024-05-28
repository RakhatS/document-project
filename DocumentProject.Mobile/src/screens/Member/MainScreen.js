import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import { Button } from "react-native-paper";
import ReferenceModal from "./ReferenceModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

const MainScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReference, setSelectedReference] = useState("");
  const [memberApplications, setMemberApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState();
  const [applicationType, setapplicationType] = useState("");
  const [createLoader, setCreateLoader] = useState(false);

  const handleSelect = (reference) => {
    setSelectedReference(reference);
    setModalVisible(false);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>
        Creator: {item.member.firstName} {item.member.lastName}
      </Text>
      <Text style={styles.cardText}>Application ID: {item.number}</Text>
      <Text style={styles.cardText}>Date Created: {item.dateCreated}</Text>
      <Text
        style={[
          styles.cardDescription,
          item.status == "Signed" ? { color: "green" } : { color: "red" },
        ]}
      >
        {item.status}
      </Text>
      <Text style={styles.cardDescription}>{item.text}</Text>
    </View>
  );

  const getApplications = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };
    const response = await fetch(
      SERVER_URL + "/api/Application/MemberApplications",
      options
    );
    const json = await response.json();
    if (json) {
      setMemberApplications(json);
    } else {
      // console.log('Server is error 500');
    }
    setLoading(false);
  };

  const getCurrent = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };
    const response = await fetch(SERVER_URL + "/api/Member/Current", options);
    const json = await response.json();
    console.log(json);
    if (json) {
      setCurrent(json);
    }
    setLoading(false);
  };

  useEffect(() => {
    getApplications();
    getCurrent();
  }, []);

  const CreateApplication = async () => {
    if (applicationType == "") {
      Alert.alert("Please choose application name");
      return;
    }

    setCreateLoader(true);
    let access_token = await AsyncStorage.getItem("access_token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        name: applicationType,
        memberId: current.id,
        organizationId: current.organizationId,
      }),
    };

    console.log(options.body);

    try {
      const response = await fetch(
        SERVER_URL + "/api/Application/Create",
        options
      );
      console.log("CreateApplication: ", response.status);
      const json = await response.json();
      if (json) {
        setCreateLoader(false);
        Alert.alert("Application created!");
        console.log(json);
        getApplications();
      } else {
        console.log(json);
        Alert.alert(json.message);
      }
    } catch (error) {
      Alert.alert("Please fill in all required fields");
      console.log("CreateDriver error: ", error);
    }
  };

  // https://localhost:7161/api/ConstData/ApplicationNames
  // https://localhost:7161/api/Organization/GetById?organizationid=616f9d24-fbcd-45a7-b52a-cf43373b9879
  // https://localhost:7161/api/Member/Current
  // https://localhost:7161/api/Application/MemberApplications
  //
  // https://localhost:7161/api/Application/Create
  // https://localhost:7161/api/Application/ApplicationDocument?applicationId=9bfcc359-439d-4c73-9eb8-33ea150e4286

  return (
    <ImageBackground
      source={require("../../../assets/fon.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="person-circle" size={50} color="#000" />
          <Text style={styles.userName}>
            {current?.firstName} {current?.lastName}
          </Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value) => {
            setapplicationType(value);
          }}
          value={applicationType}
          items={[
            {
              label: "Employment Verification",
              value: "Employment Verification",
            },
            { label: "Rental Reference", value: "Rental Reference" },
            { label: "Academic Reference", value: "Academic Reference" },
            { label: "Character Reference", value: "Character Reference" },
            { label: "Financial Reference", value: "Financial Reference" },
            { label: "Medical Reference", value: "Medical Reference" },
            { label: "Volunteer Reference", value: "Volunteer Reference" },
            {
              label: "Professional Reference",
              value: "Professional Reference",
            },
            { label: "Personal Reference", value: "Personal Reference" },
            { label: "Internship Reference", value: "Internship Reference" },
          ]}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
          }}
          Icon={() => {
            if (Platform.OS == "ios")
              return (
                <Icon
                  name="chevron-down-outline"
                  size={22}
                  style={{
                    marginTop: 15,
                    paddingVertical: 12,
                    paddingHorizontal: 35,
                    color: "black",
                  }}
                />
              );
          }}
        />

        <TouchableOpacity
          style={styles.footerButton}
          disabled={createLoader}
          onPress={() => CreateApplication()}
        >
          {createLoader ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.footerButtonText}>Create Application</Text>
          )}
        </TouchableOpacity>
        <View style={{ height: 10 }} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 22,
              fontWeight: "500",
              color: "GRAY",
            }}
          >
            Signed documents
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 15,
            }}
          >
            {memberApplications
              .filter((el) => el.status === "Signed")
              .map((item) => (
                <View key={item.id}>{renderCard({ item })}</View>
              ))}
          </View>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              fontSize: 24,
              fontWeight: "600",
              color: "#2D64D1",
            }}
          >
            Created documents
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 15,
            }}
          >
            {memberApplications
              .filter((el) => el.status !== "Signed")
              .map((item) => (
                <View key={item.id}>{renderCard({ item })}</View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardList: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: COLORS.DARK_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.DARK_BLUE,
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardButtonText: {
    fontSize: 16,
    color: COLORS.LIGHT_BLUE,
  },
  footerButton: {
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  footerButtonText: {
    fontSize: 18,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  userName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  notificationIcon: {
    padding: 5,
  },
  inputIOS: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginHorizontal: 20,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  inputAndroid: {
    marginTop: 15,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginHorizontal: 20,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
});

export default MainScreen;
