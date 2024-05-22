import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { COLORS } from "../../utils/helper";

const CurrentApplication = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignDocument = () => {
    setModalVisible(true);
  };

  const confirmSignDocument = () => {
    setModalVisible(false);
    Alert.alert(
      "Document Signed",
      "You have successfully signed the document."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Document Name:</Text>
        <Text style={styles.value}>Sample Document</Text>

        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.value}>John Doe</Text>

        <Text style={styles.label}>Application ID:</Text>
        <Text style={styles.value}>123456</Text>

        <Text style={styles.label}>Date Created:</Text>
        <Text style={styles.value}>2024-05-22</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>
          This is a sample document used to demonstrate the
          CurrentApplicationScreen layout.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignDocument}>
        <Text style={styles.buttonText}>Sign In Document</Text>
      </TouchableOpacity>

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
  );
};

export default CurrentApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
    justifyContent: "center",
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
