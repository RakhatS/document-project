import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS } from "../../utils/helper";

const CreateApplication = ({ navigation }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");

  const handleCreateApplication = () => {
    // Here you would typically handle form validation and submission
    Alert.alert(
      "Application Created",
      "Your application has been created successfully."
    );
    // Reset the form fields after submission
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setOption5("");
    // Navigate to another screen if needed
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Application</Text>
      <TextInput
        style={styles.input}
        placeholder="Document Option 1"
        value={option1}
        onChangeText={setOption1}
      />
      <TextInput
        style={styles.input}
        placeholder="Document Option 2"
        value={option2}
        onChangeText={setOption2}
      />
      <TextInput
        style={styles.input}
        placeholder="Document Option 3"
        value={option3}
        onChangeText={setOption3}
      />
      <TextInput
        style={styles.input}
        placeholder="Document Option 4"
        value={option4}
        onChangeText={setOption4}
      />
      <TextInput
        style={styles.input}
        placeholder="Document Option 5"
        value={option5}
        onChangeText={setOption5}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateApplication}>
        <Text style={styles.buttonText}>Create Application</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateApplication;

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
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: "#000000",
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
});
