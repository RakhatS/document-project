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

const AdminMembers = () => {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setMembers(members.filter((org) => org.id !== id));
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
        SERVER_URL + "/api/Member/MembersList",
        options
      );
      const json = await response.json();
      if (json) {
        setMembers(json);
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
      {members.map((org) => (
        <Card key={org.id} style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>
              {org.firstName} {org.lastName}
            </Title>
            <Paragraph style={styles.paragraph}>Email: {org.email}</Paragraph>
            <Paragraph style={styles.paragraph}>
              Position: {org.position}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Address: {org.address}
            </Paragraph>

            <Paragraph style={styles.paragraph}>
              Organization: {org.organization.name}
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

export default AdminMembers;
