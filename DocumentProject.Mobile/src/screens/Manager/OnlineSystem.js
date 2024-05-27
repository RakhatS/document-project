import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const OnlineSigningSystem = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>How our online signing system works?</Text>
        <Text style={styles.date}>06.12.2023 14:31</Text>

        <Text style={styles.content}>
          Adding a Signature:
          {"\n"}The user selects a place to sign the document.
          {"\n"}The Swift Sign platform provides various signature methods such
          as manual signature, electronic signature, or even the use of
          certified digital signatures.
          {"\n\n"}Confirmation of Legality:
          {"\n"}SwiftSign can add information about the time and place of the
          signature to ensure legal validity.
          {"\n"}If necessary, the system can use tools to verify the digital
          signature.
          {"\n\n"}Distribution and Notifications:
          {"\n"}After signing, the document can be saved and distributed to
          interested parties.
          {"\n"}Swift Sign can automatically notify the parties when the signing
          is completed.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OnlineSigningSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  logo: {
    width: "100%",
    height: 150,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
