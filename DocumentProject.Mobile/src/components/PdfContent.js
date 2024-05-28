import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import { COLORS, SERVER_URL, getToken } from "../utils/helper";
import HTMLContent from "../screens/Manager/HTMLContent";
import MemberHTML from "./MemberHTML";

const PdfContent = ({ idd }) => {
  const [pdfHtml, setPdfHtml] = useState("");

  const getDocument = async () => {
    try {
      let access_token = await getToken();
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await fetch(
        SERVER_URL +
          "/api/Application/ApplicationDocument?applicationId=" +
          idd,
        options
      );
      console.log(response.status);
      const json = await response.json();
      setPdfHtml(json.content);
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return (
    <View style={styles.container}>
      {pdfHtml ? <MemberHTML htmlContent={pdfHtml} /> : <Text>empty</Text>}
      <View
        style={{
          backgroundColor: "red",
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 20,
          paddingHorizontal: 30,
          opacity: 0.5,
          borderTopLeftRadius: 20,
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 22, fontWeight: "700" }}>
          PDF
        </Text>
      </View>
    </View>
  );
};

export default PdfContent;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 200,
    marginRight: 15,
    marginBottom: 15,
    // justifyContent: "center",
  },
});
