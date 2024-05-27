import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../../utils/helper";
import { Button } from "react-native-paper";
import ReferenceModal from "./ReferenceModal";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReference, setSelectedReference] = useState("");

  const handleSelect = (reference) => {
    setSelectedReference(reference);
    setModalVisible(false);
  };

  const data = [
    {
      id: "1",
      documentName: "Document 1",
      creator: "Creator A",
      applicationId: "APP001",
      dateCreated: "2023-05-01",
      description: "Description of document 1",
    },
    {
      id: "2",
      documentName: "Document 2",
      creator: "Creator B",
      applicationId: "APP002",
      dateCreated: "2023-06-01",
      description: "Description of document 2",
    },
    // Add more sample data as needed
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.documentName}</Text>
      <Text style={styles.cardText}>Creator: {item.creator}</Text>
      <Text style={styles.cardText}>Application ID: {item.applicationId}</Text>
      <Text style={styles.cardText}>Date Created: {item.dateCreated}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.cardButtonText}>Sign in Document</Text>
      </TouchableOpacity>
    </View>
  );

  // https://localhost:7161/api/ConstData/ApplicationNames
  // https://localhost:7161/api/Organization/GetById?organizationid=616f9d24-fbcd-45a7-b52a-cf43373b9879
  // https://localhost:7161/api/Member/Current
  // https://localhost:7161/api/Application/MemberApplications
  //
  // https://localhost:7161/api/Application/Create
  // https://localhost:7161/api/Application/ApplicationDocument?applicationId=9bfcc359-439d-4c73-9eb8-33ea150e4286

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.footerButtonText}>Create App</Text>
      </TouchableOpacity>

      {selectedReference ? (
        <Text style={styles.selectedText}>Selected: {selectedReference}</Text>
      ) : null}
      <ReferenceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />
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
