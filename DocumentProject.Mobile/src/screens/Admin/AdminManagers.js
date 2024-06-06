import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { COLORS, SERVER_URL } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminManagers = () => {
  const [managers, setManagers] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setManagers(managers.filter((org) => org.id !== id));
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else
    return (
      <ScrollView style={styles.container}>
        {managers.map((org, index) => (
          <Card key={org.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>
                № {index + 1} {org.lastName} {org.firstName}
              </Title>
              <Paragraph style={styles.paragraph}>Email: {org.email}</Paragraph>
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
});

export default AdminManagers;
