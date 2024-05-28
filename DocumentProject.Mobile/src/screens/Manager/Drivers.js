import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Button, TextInput, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drivers = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [organizationDrivers, setOrganizationDrivers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [Footer, setFooter] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const GetOrganizationDrivers = async () => {
    setRefreshing(true);
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
        `/api/Member/OrganizationMembers?organizationId=${organizationId}`,
      options
    );
    const json = await response.json();
    console.log(json);
    if (json) {
      // console.log(json.data);
      setFooter(json);

      setOrganizationDrivers(json);
      setRefreshing(false);
    } else {
      // console.log('Server is error 500');
    }
    setLoading(false);
  };

  useEffect(() => {
    GetOrganizationDrivers();
  }, [isFocused]);

  return (
    <ImageBackground
      source={require("../../../assets/fon.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.contain}>
        <TouchableOpacity
          style={styles.weightButton}
          onPress={() => navigation.navigate("CreateDriver")}
        >
          <Text style={styles.weightButtonText}>+ Add member</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 20,
            borderRadius: 20,
            height: "90%",
          }}
        >
          {organizationDrivers.length >= 1 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshing={refreshing}
              data={organizationDrivers}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.container}>
                      <View style={styles.mainInfo}>
                        <View
                          style={{
                            width: "30%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Avatar.Image
                            source={
                              item.photoBase64
                                ? {
                                    uri: `data:image/jpeg;base64,${item.photoBase64}`,
                                  }
                                : require("../../../assets/driver.png")
                            }
                            // source={require('../../../../assets/driver.png')}
                            size={100}
                            style={{
                              backgroundColor: "#ffffff",
                              borderWidth: 1,
                              borderColor: "#C2C2C2",
                            }}
                          />
                        </View>
                        <View style={{ width: "65%" }}>
                          <Text style={styles.applicationStatusText}>
                            {item.firstName} {item.lastName}
                          </Text>
                          <Text style={styles.mainInfoText}>
                            position:{" "}
                            <Text style={styles.mainInfoTitle}>
                              {item.position}
                            </Text>
                          </Text>

                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("EditDriver", item)
                            }
                            style={styles.applicationStatusContainer}
                          >
                            <Text style={styles.applicationStatusText}>
                              Edit member
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <Divider />
                  </>
                );
              }}
              ListFooterComponent={
                refreshing && (
                  <View style={styles.indicatorContain}>
                    <ActivityIndicator size={16} />
                  </View>
                )
              }
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Drivers;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    // paddingHorizontal: 18,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    // marginBottom: 10,
    // marginTop: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
  },
  applicationStatusText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#000000",
  },
  mainInfo: {
    marginTop: 8,
    flexDirection: "row",
  },
  mainInfoTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#49454F",
  },
  mainInfoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1B20",
    width: 150,
  },
  additionalInfo: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusContainer: {
    marginTop: 12,
  },
  applicationStatusContainer: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    padding: 4,
    backgroundColor: COLORS.LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  applicationStatusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  mainInfo: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainInfoTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#49454F",
  },
  statusView: {
    width: "50%",
    backgroundColor: "#fef3f2",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  statusText: {
    fontFamily: "LeagueSpartan-Medium",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    color: "#b42318",
  },
  button: {
    marginTop: 24,
    backgroundColor: COLORS.DARK_BLUE,
  },
  weightButton: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  weightButtonText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "LeagueSpartan-Medium",
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  uploadButton: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    marginBottom: 10,
  },
});
