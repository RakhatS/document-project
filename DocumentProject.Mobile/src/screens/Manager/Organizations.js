import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SERVER_URL } from "../../utils/helper";

const Organizations = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [organizations, setOrganizations] = useState();
  const [loading, setLoading] = useState(false);

  const handleOrganizationPress = async (organizationId, organizationName) => {
    await AsyncStorage.setItem("organizationId", organizationId);
    await AsyncStorage.setItem("organizationName", organizationName);
    navigation.navigate("ManagerTab");
  };

  useEffect(() => {
    if (isFocused) {
      GetOwnerOrganizations();
    }
  }, [isFocused]);

  const GetOwnerOrganizations = async () => {
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
      SERVER_URL + "/api/Organization/ManagerOrganizations",
      options
    );
    const json = await response.json();
    if (json) {
      setOrganizations(json);
    } else {
      // console.log('Server is error 500');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginVertical: 25 }}
      >
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size={20} color={"orange"} />
          ) : (
            organizations?.map((organization, index) => (
              <TouchableOpacity
                key={organization.id}
                style={styles.organizationCard}
                onPress={() =>
                  handleOrganizationPress(organization.id, organization.name)
                }
              >
                <Text style={styles.organizationNumber}>{index + 1}</Text>
                <Text style={styles.organizationName}>{organization.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF", // White background
    marginVertical: 25,
  },
  organizationCard: {
    width: "80%",
    backgroundColor: COLORS.MEDIUM_BLUE,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  organizationNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", // White text color
  },
  organizationName: {
    fontSize: 16,
    color: "#FFF", // White text color
  },
});

export default Organizations;
