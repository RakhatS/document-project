import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import { COLORS, SERVER_URL, getToken } from "../../utils/helper";
import RenderHtml from "react-native-render-html";
import HTMLContent from "./HTMLContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ROLES } from "../../enums";

const CurrentApplication = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfHtml, setPdfHtml] = useState("");
  const [role, setrole] = useState("");

  const handleSignDocument = () => {
    setModalVisible(true);
  };
  console.log(route.params.id);

  const confirmSignDocument = async () => {
    setModalVisible(false);
    try {
      let access_token = await AsyncStorage.getItem("access_token");

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
          body: {},
        },
      };

      const response = await fetch(
        SERVER_URL +
          `/api/Application/ChangeStatus?applicationId=${route.params.id}&newStatus=Signed`,
        options
      );
      getDocument();
      console.log("Signed status: ", response.status);
      Alert.alert(
        "Document Signed",
        "You have successfully signed the document."
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDocument = async () => {
    try {
      let access_token = await getToken();
      let _role = await AsyncStorage.getItem("role");
      setrole(_role);
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await fetch(
        SERVER_URL +
          "/api/Application/ApplicationDocument?applicationId=" +
          route.params.id,
        options
      );
      console.log(response.status);
      const json = await response.json();
      setPdfHtml(json.content);
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Application Details</Text>
        {pdfHtml && <HTMLContent htmlContent={pdfHtml} />}

        <View style={{ height: 100 }} />

        {role == USER_ROLES.ROLE_MANAGER && (
          <TouchableOpacity style={styles.button} onPress={handleSignDocument}>
            <Text style={styles.buttonText}>Sign In Document</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Sign Document</Text>
              <Text style={styles.modalMessage}>
                Do you really want to sign it?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={confirmSignDocument}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CurrentApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
    // justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.DARK_BLUE,
  },
  card: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.DARK_BLUE,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.DARK_BLUE,
    marginBottom: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.DARK_BLUE,
  },
  modalMessage: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.DARK_BLUE,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
  },
  modalButtonYes: {
    backgroundColor: COLORS.DARK_BLUE,
  },
  modalButtonNo: {
    backgroundColor: COLORS.MEDIUM_BLUE,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.LIGHT_BLUE,
    fontWeight: "bold",
  },
});
