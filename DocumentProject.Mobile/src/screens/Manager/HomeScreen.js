import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApplications = async () => {
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
    const response = await fetch(
      SERVER_URL +
        "/api/Application/OrganizationApplications?organizationId=" +
        organizationId,
      options
    );
    const json = await response.json();
    // console.log(json);
    if (json) {
      setApplications(json);
    } else {
      // console.log('Server is error 500');
    }
    setLoading(false);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Creator: {item.member.firstName}</Text>
      <Text style={styles.cardText}>Application ID: {item.number}</Text>
      <Text style={styles.cardText}>Date Created: {item.dateCreated}</Text>
      <Text style={styles.cardText}>
        Organization: {item.organization.name}
      </Text>
      <Text style={styles.cardDescription}>{item.text}</Text>
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate("CurrentApplication", item)}
      >
        <Text style={styles.cardButtonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    getApplications();
  }, []);

  // https://localhost:7161/api/ConstData/ApplicationNames
  // https://localhost:7161/api/Manager/Current
  // https://localhost:7161/api/Organization/GetById?organizationid=616f9d24-fbcd-45a7-b52a-cf43373b9879
  // https://localhost:7161/api/Application/OrganizationApplications?organizationId=616f9d24-fbcd-45a7-b52a-cf43373b9879
  // https://localhost:7161/api/Member/OrganizationMembers?organizationId=616f9d24-fbcd-45a7-b52a-cf43373b9879
  // https://localhost:7161/api/Application/ApplicationDocument?applicationId=f56bcee0-01b0-4049-99ff-92185e32f8f9

  // https://localhost:7161/api/Member/CreateOrganizationMember   POST
  // {
  // "email": "kbeknur@mail.ru",
  // "firstName": "Beknur",
  // "lastName": "Kettesh",
  // "position": "fsad fsf asf",
  // "address": "dsafads fdsa fds fsad",
  // "photoBase64": null,
  // "organizationId": "616f9d24-fbcd-45a7-b52a-cf43373b9879",
  // "password": "admin",
  // "id": "00000000-0000-0000-0000-000000000000",
  // "dateCreated": "0001-01-01T00:00:00"
  // }

  // https://localhost:7161/api/Application/ChangeStatus?applicationId=9bfcc359-439d-4c73-9eb8-33ea150e4286&newStatus=Signed

  // https://localhost:7161/api/Application/ApplicationDocument?applicationId=9bfcc359-439d-4c73-9eb8-33ea150e4286

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={applications}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      {/* <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("CreateApplication")}
      >
        <Text style={styles.footerButtonText}>Create Application</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
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
    marginHorizontal: 15,
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
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  footerButtonText: {
    fontSize: 18,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
});

export default HomeScreen;
