import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";

const HTMLContent = ({ htmlContent }) => {
  const { width } = Dimensions.get("window");

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ flex: 1, width: width, height: 400 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default HTMLContent;
