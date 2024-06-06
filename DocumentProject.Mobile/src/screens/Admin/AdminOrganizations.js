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

const initialOrganizations = [
  {
    id: 1,
    name: "EN",
    bin: "4934043954490",
    address: "Astana",
    contact: "87089594403",
    owner: "Rakhat Saparbaev",
  },
  {
    id: 2,
    name: 'ИП "CAR-GO"',
    bin: "1313231312",
    address: "Astana Puwkina 25",
    contact: "87784526061",
    owner: "Kettesh Beknur",
  },
  {
    id: 3,
    name: "IITU",
    bin: "022244886145",
    address: "Manasa",
    contact: "87775156633",
    owner: "Dulat Kalimbetov",
  },
];

const AdminOrganizations = () => {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  useEffect(() => {
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

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

export default AdminOrganizations;
