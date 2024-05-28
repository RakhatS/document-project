import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";

const MemberHTML = ({ htmlContent }) => {
  const { width } = Dimensions.get("window");

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      //   style={{ flex: 1, width: 200, height: 150 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default MemberHTML;
