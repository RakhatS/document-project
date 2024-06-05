import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SERVER_URL } from "../../utils/helper";
import { useNavigation } from "@react-navigation/native";

const MemberNotifications = () => {
  const naviagtion = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
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
        SERVER_URL + "/api/Notification/MemberNotifications",
        options
      );
      const json = await response.json();
      if (json) {
        console.log(json);
        setNotifications(json);
      } else {
        // console.log('Server is error 500');
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>
        {new Date(item.dateCreated).toLocaleDateString()}{" "}
        {new Date(item.dateCreated).toLocaleTimeString()}
      </Text>
      <Text style={styles.notificationStatus}>
        Status: {item.isMarkedAsRead ? "Read" : "Unread"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={() => naviagtion.goBack()}>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
        }
        ListHeaderComponent={
          <View>
            <Text style={{ fontSize: 24, fontWeight: "500" }}>
              Notifications
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  notificationStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MemberNotifications;
