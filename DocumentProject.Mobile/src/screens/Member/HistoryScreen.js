import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../utils/helper";

const sampleData = [
  {
    id: "1",
    documentName: "Document A",
    creator: "Alice Smith",
    applicationId: "1001",
    dateCreated: "2024-05-20",
    description: "Description for Document A",
  },
  {
    id: "2",
    documentName: "Document B",
    creator: "Bob Johnson",
    applicationId: "1002",
    dateCreated: "2024-05-18",
    description: "Description for Document B",
  },
  // Add more sample data as needed
];

const HistoryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Document Name:</Text>
      <Text style={styles.value}>{item.documentName}</Text>

      <Text style={styles.label}>Creator:</Text>
      <Text style={styles.value}>{item.creator}</Text>

      <Text style={styles.label}>Application ID:</Text>
      <Text style={styles.value}>{item.applicationId}</Text>

      <Text style={styles.label}>Date Created:</Text>
      <Text style={styles.value}>{item.dateCreated}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application History</Text>
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.DARK_BLUE,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.MEDIUM_BLUE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
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
    marginBottom: 10,
  },
});
