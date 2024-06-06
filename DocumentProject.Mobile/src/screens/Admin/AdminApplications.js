import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Appbar,
} from "react-native-paper";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AdminApplications = () => {
  const navigation = useNavigation();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleDetails = (item) => {
    navigation.navigate("CurrentApplication", item);
    // Implement navigation to details screen or action
  };

  useEffect(() => {
    const fetchApplications = async () => {
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
        SERVER_URL + "/api/Application/ApplicationsList",
        options
      );
      const json = await response.json();
      if (json) {
        setApplications(json);
        setFilteredApplications(json);
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [filter, applications]);

  const filterApplications = () => {
    if (filter === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === filter)
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Appbar.Header>
        <Appbar.Content title="Applications" />
      </Appbar.Header> */}
      <View style={styles.filterContainer}>
        <Button
          mode={filter === "All" ? "contained" : "outlined"}
          onPress={() => setFilter("All")}
          style={styles.filterButton}
        >
          All
        </Button>
        <Button
          mode={filter === "Awaiting" ? "contained" : "outlined"}
          onPress={() => setFilter("Awaiting")}
          style={styles.filterButton}
        >
          Awaiting
        </Button>
        <Button
          mode={filter === "Signed" ? "contained" : "outlined"}
          onPress={() => setFilter("Signed")}
          style={styles.filterButton}
        >
          Signed
        </Button>
        <Button
          mode={filter === "Unsigned" ? "contained" : "outlined"}
          onPress={() => setFilter("Unsigned")}
          style={styles.filterButton}
        >
          Unsigned
        </Button>
      </View>
      <ScrollView>
        {filteredApplications.map((app, index) => (
          <Card key={app.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{app.name}</Title>
              <Paragraph style={styles.paragraph}>№: {index + 1}</Paragraph>
              <Paragraph style={styles.paragraph}>
                Number: {app.number}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Organization: {app.organization.name}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Status: {app.status}
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="contained"
                color="#1e90ff"
                onPress={() => handleDetails(app)}
                style={styles.detailsButton}
              >
                Details
              </Button>
              <Button
                mode="contained"
                color="#ff4d4d"
                onPress={() => handleDelete(app.id)}
                style={styles.deleteButton}
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 10,
    paddingTop: 65,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    marginHorizontal: 15,
    marginVertical: 5,
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
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsButton: {
    backgroundColor: "#1e90ff",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminApplications;
