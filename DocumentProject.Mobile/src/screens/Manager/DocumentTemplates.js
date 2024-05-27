import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SERVER_URL } from "../../utils/helper";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    text: "How our online signing system works?",
    date: "06.12.2023  14:31",
    img: "a",
  },
  {
    id: 2,
    text: "Integration with other systems",
    date: "01.12.2023 12:35",
    img: "b",
  },
];

const DocumentTemplates = () => {
  const naviagtion = useNavigation();
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(false);

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
    const response = await fetch(SERVER_URL + "/api/Manager/Current", options);
    const json = await response.json();
    console.log("json: ", json);
    if (json) {
      setCurrent(json);
    }
    setLoading(false);
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

        <Text style={styles.title}>Statements</Text>

        <View style={styles.statementsContainer}>
          <TouchableOpacity
            style={styles.statementButton}
            onPress={() => naviagtion.navigate("OnlineSigningSystem")}
          >
            <Image
              source={require("../../../assets/1.png")}
              style={{ width: 56, height: 56 }}
            />
            <Text style={styles.statementText}>for a paid retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementButton}>
            <Image
              source={require("../../../assets/2.png")}
              style={{ width: 56, height: 56 }}
            />
            <Text style={styles.statementText}>an empty template</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementButton}>
            <Image
              source={require("../../../assets/1.png")}
              style={{ width: 56, height: 56 }}
            />
            <Text style={styles.statementText}>to participate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statementButton}>
            <Image
              source={require("../../../assets/2.png")}
              style={{ width: 56, height: 56 }}
            />
            <Text style={styles.statementText}>
              for the provision of a place in the hostel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestButton}>
            <Text
              style={styles.statementText}
              onPress={() => naviagtion.navigate("OnlineSigningSystem")}
            >
              Didn’t find a suitable document?{" "}
              <Text style={styles.requestText}>Request</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.platformInfoContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.platformInfoTitle}>Platform information</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.platformInfo}>
            <Icon name="document-text" size={50} color="#000" />
            <View>
              <Text style={styles.platformInfoText}>
                How our online signing system works?
              </Text>
              <Text style={styles.platformInfoDate}>06.12.2023 14:31</Text>
            </View>
          </View>
          <View style={styles.platformInfo}>
            <Icon name="settings" size={50} color="#000" />
            <View>
              <Text style={styles.platformInfoText}>
                Integration with other systems
              </Text>
              <Text style={styles.platformInfoDate}>01.12.2023 12:35</Text>
            </View>
          </View> */}
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ padding: 10, flexWrap: "wrap" }}
                  onPress={() => naviagtion.navigate("OnlineSigningSystem")}
                >
                  <Image
                    source={
                      item.img == "a"
                        ? require(`../../../assets/a.png`)
                        : require(`../../../assets/b.png`)
                    }
                    style={{ width: 240, height: 120, marginBottom: 10 }}
                  />
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#00194A",
                      fontSize: 16,
                      width: 240,
                    }}
                  >
                    {item.text}
                  </Text>
                  <Text>{item.date}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DocumentTemplates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#FFFFFF",
  },
  statementsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
  },
  statementButton: {
    alignItems: "center",
    width: "30%",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  statementText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
  requestButton: {
    marginTop: 100,
    marginLeft: 50,
    width: "50%",
  },
  requestText: {
    color: "#0000EE",
    textAlign: "center",
  },
  platformInfoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  platformInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAllButton: {
    alignSelf: "flex-end",
  },
  viewAllText: {
    color: "#0000EE",
  },
  platformInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  platformInfoText: {
    fontSize: 16,
  },
  platformInfoDate: {
    color: "#666",
  },
});
