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
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import PdfContent from "../../components/PdfContent";
import { format } from "date-fns";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReference, setSelectedReference] = useState("");
  const [memberApplications, setMemberApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState();

  const handleSelect = (reference) => {
    setSelectedReference(reference);
    setModalVisible(false);
  };

  const renderCard = ({ item }) => (
    <View style={[styles.card]}>
      <View style={{ flexDirection: "row" }}>
        <PdfContent idd={item.id} />
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardText}>Creator: {item.member.firstName}</Text>
          <Text style={styles.cardText}>ID-{item.number}</Text>
          <Text style={styles.cardText}>
            {format(item.dateCreated, "dd-mm-yyyy, hh:mm")}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              item.status == "Signed" ? { color: "green" } : { color: "red" },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate("CurrentApplication", item)}
      >
        <Text style={styles.cardButtonText}>Details</Text>
      </TouchableOpacity>
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
    if (json) {
      setCurrent(json);
    }
    setLoading(false);
  };

  useEffect(() => {
    getApplications();
    getCurrent();
  }, []);

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

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 22,
              fontWeight: "500",
              color: "#FFFFFF",
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
    // backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: COLORS.DARK_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 35,
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
    fontSize: 22,
    fontWeight: "600",
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
});

export default HomeScreen;
