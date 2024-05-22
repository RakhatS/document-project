import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";

const toolsData = [
  { id: "1", name: "Screwdriver", iconName: "ios-build-outline" },
  { id: "2", name: "Hammer", iconName: "ios-hammer-outline" },
  { id: "3", name: "Wrench", iconName: "home-outline" },
  { id: "4", name: "Pliers", iconName: "ios-analytics" },
  { id: "5", name: "Tape Measure", iconName: "ios-expand" },
  { id: "6", name: "Drill", iconName: "ios-hammer-outline" },
  { id: "7", name: "Saw", iconName: "ios-cut-outline" },
  { id: "8", name: "Level", iconName: "ios-analytics" },
  { id: "9", name: "Paintbrush", iconName: "ios-brush-outline" },
  { id: "10", name: "Safety Glasses", iconName: "ios-glasses-outline" },
  { id: "11", name: "Paintbrush", iconName: "color-fill-outline" },
  { id: "12", name: "Safety Glasses", iconName: "cloud-done-outline" },
];

const ToolsScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    // let result = await WebBrowser.openBrowserAsync(
    //   "https://spyfall.adrianocola.com/"
    // );
    // setResult(result);
    navigation.navigate("Coin");
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <Avatar.Image
          size={40}
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ marginRight: 15, marginLeft: 10 }}
        />
        <View>
          <Text style={styles.name}>Beknur K.</Text>
          <Text style={styles.description}>Настройки</Text>
        </View>
        <Icon
          name="chevron-forward-sharp"
          size={25}
          color={"#c8c8c8"}
          style={styles.profileIcon}
        />
      </View>

      <View style={{ height: 5 }} />

      <View style={styles.tools}>
        <FlatList
          data={toolsData}
          numColumns={4}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.toolContainer}
                onPress={_handlePressButtonAsync}
              >
                <Icon name={item.iconName} size={35} color="#f05d67" />
                <Text style={styles.toolText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={{ height: 5 }} />

      <View style={styles.footerView}>
        <Text style={styles.footerText}>Дополнительные материалы</Text>

        <View style={styles.profileView}>
          <Avatar.Image
            size={40}
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ marginRight: 15, marginLeft: 10 }}
          />
          <View style={{ flexWrap: "wrap", width: "80%" }}>
            <Text style={styles.name}>Роль аналитика в дебатах</Text>
            <Text style={styles.description}>
              Для хорошего анализа нужно много практики
            </Text>
          </View>
          <Icon
            name="chevron-forward-sharp"
            size={25}
            color={"#c8c8c8"}
            style={styles.profileIcon}
          />
        </View>

        <View style={styles.profileView}>
          <Avatar.Image
            size={40}
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ marginRight: 15, marginLeft: 10 }}
          />
          <View style={{ flexWrap: "wrap", width: "80%" }}>
            <Text style={styles.name}>Beknur K.</Text>
            <Text style={styles.description}>
              Для хорошего анализа нужно много практики
            </Text>
          </View>
          <Icon
            name="chevron-forward-sharp"
            size={25}
            color={"#c8c8c8"}
            style={styles.profileIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default ToolsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10
  },
  profileView: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "400",
    color: "#373737",
  },
  description: {
    color: "#999999",
    width: "100%",
  },
  profileIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
  },
  tools: {
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  toolContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  toolText: {
    fontSize: 14,
    fontWeight: "400",
  },
  footerView: {
    // paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    // paddingBottom: 15,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    paddingTop: 10,
  },
});
