import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../../utils/helper";

const HomeScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Create Application</Text>
      </TouchableOpacity>
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
