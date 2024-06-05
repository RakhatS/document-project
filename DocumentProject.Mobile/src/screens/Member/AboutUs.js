import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

const AboutUs = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Who Are We?</Text>
        <Text style={styles.description}>
          We are SwiftSign, a platform that simplifies the document signing
          process with flexible signature methods, legal validation, and
          automated notifications and distribution.
        </Text>

        <Text style={styles.subtitle}>Adding a Signature:</Text>
        <Text style={styles.text}>
          The user selects a place to sign the document. The SwiftSign platform
          provides various signature methods such as manual signature,
          electronic signature, or even the use of certified digital signatures.
        </Text>

        <Text style={styles.subtitle}>Confirmation of Legality:</Text>
        <Text style={styles.text}>
          SwiftSign can add information about the time and place of the
          signature to ensure legal validity. If necessary, the system can use
          tools to verify the digital signature.
        </Text>

        <Text style={styles.subtitle}>Distribution and Notifications:</Text>
        <Text style={styles.text}>
          After signing, the document can be saved and distributed to interested
          parties. SwiftSign can automatically notify the parties when the
          signing is completed.
        </Text>

        <Text style={styles.authorsTitle}>Authors:</Text>
        <Text style={styles.authors}>- Kalimbetov Dulat</Text>
        <Text style={styles.authors}>- Artelbekov Elzhan</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
  },
  authorsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  authors: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
  },
});

export default AboutUs;
