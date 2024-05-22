import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const NearEvents = [
  {
    id: 1,
    imgUrl: "https://picsum.photos/200/300",
    name: "Alau Cup",
    addres: "Papaya Beach",
    quantityPeopls: 15,
    date: "Saturday, May 30",
    host: true,
  },
  {
    id: 2,
    imgUrl: "https://picsum.photos/200/300",
    name: "Mahabbat Mekeni",
    addres: "Pink Loft",
    quantityPeopls: 12,
    date: "Saturday, May 22",
    host: true,
  },
  {
    id: 3,
    imgUrl: "https://picsum.photos/200/300",
    name: "Apa Cup",
    addres: "Walker street",
    date: "Saturday, May 25",
    quantityPeopls: 22,
    host: true,
  },
  {
    id: 4,
    imgUrl: "https://picsum.photos/200/300",
    name: "Senim Cup",
    addres: "Walker street",
    date: "Saturday, May 25",
    quantityPeopls: 22,
    host: true,
  },
  {
    id: 5,
    imgUrl: "https://picsum.photos/200/300",
    name: "NU Cup",
    addres: "Walker street",
    date: "Saturday, May 25",
    quantityPeopls: 22,
    host: true,
  },
  {
    id: 6,
    imgUrl: "https://picsum.photos/200/300",
    name: "Kultegin XXI",
    addres: "Walker street",
    date: "Saturday, May 25",
    quantityPeopls: 22,
    host: true,
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: "#ffffff",
        }}
      >
        <FlatList
          data={NearEvents}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Tournament")}
                style={{
                  height: 180,
                  backgroundColor: "#ffffff",
                  borderRadius: 15,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  elevation: 8,
                  marginTop: 20,
                  marginHorizontal: 5,
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{
                    height: "65%",
                    width: "100%",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <Text style={{ paddingHorizontal: 5 }}>
                    {item.name}
                    <Icon name="home" size={24} color={"#696969"} />
                  </Text>
                  <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
                    <Icon name="people-outline" size={18} />
                    <Text>{item.quantityPeopls}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    borderTopWidth: 0.5,
                    borderColor: "#D9D9D9",
                  }}
                >
                  <View style={{ flexDirection: "row", width: "55%" }}>
                    <Icon
                      name="stopwatch-outline"
                      size={20}
                      style={{ marginLeft: 5 }}
                    />
                    <Text>{item.date}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="location-outline" size={20} />
                    <Text>{item.addres}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <FlatList
                data={NearEvents}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        height: 120,
                        width: 150,
                        backgroundColor: "#ffffff",
                        borderRadius: 15,
                        marginRight: 15,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.6,
                        elevation: 8,
                      }}
                    >
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={{
                          height: "80%",
                          width: "100%",
                          borderRadius: 15,
                        }}
                        resizeMode="cover"
                      />
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: "#8F8F8F",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingVertical: 10,
  },
});
