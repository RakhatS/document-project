import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SERVER_URL } from "../../utils/helper";

const Organizations = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgBin, setOrgBin] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgContactNumber, setOrgContactNumber] = useState("");
  const [creatingOrg, setCreatingOrg] = useState(false);

  const [current, setCurrent] = useState();

  const getCurrent = async () => {
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
  };

  const handleOrganizationPress = async (organizationId, organizationName) => {
    await AsyncStorage.setItem("organizationId", organizationId);
    await AsyncStorage.setItem("organizationName", organizationName);
    navigation.navigate("ManagerTab");
  };

  useEffect(() => {
    if (isFocused) {
      GetOwnerOrganizations();
      getCurrent();
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

  const handleCreateOrganization = async () => {
    setCreatingOrg(true);
    const organizationData = {
      name: orgName,
      bin: orgBin,
      address: orgAddress,
      contactNumber: orgContactNumber,
      ownerManagerId: current.id,
    };

    let access_token = await AsyncStorage.getItem("access_token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(organizationData),
    };

    try {
      const response = await fetch(
        SERVER_URL + "/api/Organization/Create",
        options
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Organization created successfully");
        setModalVisible(false);
        GetOwnerOrganizations();
      } else {
        Alert.alert("Error", result.message || "Failed to create organization");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setCreatingOrg(false);
    }
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create Organization</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={orgName}
            onChangeText={setOrgName}
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="BIN"
            value={orgBin}
            onChangeText={setOrgBin}
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={orgAddress}
            onChangeText={setOrgAddress}
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={orgContactNumber}
            onChangeText={setOrgContactNumber}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleCreateOrganization}
            disabled={creatingOrg}
          >
            {creatingOrg ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Create</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  createButton: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    position: "absolute",
    bottom: 30,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: COLORS.MEDIUM_BLUE,
    fontSize: 16,
  },
});

export default Organizations;
