import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgBin, setOrgBin] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgContactNumber, setOrgContactNumber] = useState("");
  const [creatingOrg, setCreatingOrg] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");

  const handleDelete = (id) => {
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  const handleCreateOrganization = async () => {
    setCreatingOrg(true);
    const organizationData = {
      name: orgName,
      bin: orgBin,
      address: orgAddress,
      contactNumber: orgContactNumber,
      ownerManagerId: selectedManager,
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
        SERVER_URL + "/api/Organization/CreateForManager",
        options
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Organization created successfully");
        setModalVisible(false);
        fetchOrganizations();
      } else {
        Alert.alert("Error", result.message || "Failed to create organization");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setCreatingOrg(false);
    }
  };

  const fetchOrganizations = async () => {
    setLoading(true);
    let access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };
    const response = await fetch(
      SERVER_URL + "/api/Organization/OrganizationsList",
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

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const fetchManagers = async () => {
      setLoading(true);
      let access_token = await AsyncStorage.getItem("access_token");
      console.log(access_token);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await fetch(
        SERVER_URL + "/api/Manager/ManagersList",
        options
      );
      const json = await response.json();
      if (json) {
        setManagers(json);
      } else {
        // console.log('Server is error 500');
      }
      setLoading(false);
    };

    fetchManagers();
  }, []);

  const renderManagerOptions = () => {
    return managers.map((manager) => (
      <TouchableOpacity
        key={manager.id}
        style={styles.managerOption}
        onPress={() => setSelectedManager(manager.id)}
      >
        <Text>{`${manager.firstName} ${manager.lastName}`}</Text>
        {selectedManager === manager.id && <Text>✔️</Text>}
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Create a new Organization</Text>
      </TouchableOpacity>
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
          <View style={styles.managerOptionsContainer}>
            <Text style={styles.managerOptionsTitle}>Select Manager:</Text>
            {renderManagerOptions()}
          </View>
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
      <View>
        {organizations.map((org) => (
          <Card key={org.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{org.name}</Title>
              <Paragraph style={styles.paragraph}>BIN: {org.bin}</Paragraph>
              <Paragraph style={styles.paragraph}>
                Address: {org.address}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Contact: {org.contactNumber}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Owner: {org.ownerManager.firstName} {org.ownerManager.lastName}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                color="#ff4d4d"
                onPress={() => handleDelete(org.id)}
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 10,
    paddingTop: 65,
  },
  card: {
    marginBottom: 10,
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 8,
  },
  title: {
    color: COLORS.DARK_BLUE,
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraph: {
    color: COLORS.DARK_BLUE,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
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

export default AdminOrganizations;
