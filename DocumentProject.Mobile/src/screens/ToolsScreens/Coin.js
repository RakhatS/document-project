import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

const Coin = () => {
  const [coinSide, setCoinSide] = useState("Heads");
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipCoin = () => {
    const randomSide = Math.floor(Math.random() * 2);

    // Create a flip animation
    Animated.timing(flipAnimation, {
      toValue: 7,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reset the animation value and set the
      // coin side based on the random result
      flipAnimation.setValue(0);
      if (randomSide === 0) {
        setCoinSide("Heads");
        setHeadsCount(headsCount + 1);
      } else {
        setCoinSide("Tails");
        setTailsCount(tailsCount + 1);
      }
    });
  };

  const resetCounts = () => {
    setHeadsCount(0);
    setTailsCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Flip App</Text>
      <View style={styles.coinContainer}>
        {coinSide && (
          <Animated.Image
            source={
              coinSide === "Heads"
                ? require("../../../assets/heads.jpeg")
                : require("../../../assets/tails.jpeg")
            }
            style={[
              styles.coinImage,
              {
                transform: [
                  {
                    rotateY: flipAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
      </View>
      <View style={styles.countContainer}>
        <View style={styles.count}>
          <Text style={styles.countText}>Heads: {headsCount}</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>Tails: {tailsCount}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={flipCoin}>
          <Text style={styles.buttonText}>Flip Coin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetCounts}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  coinContainer: {
    marginBottom: 30,
  },
  coinImage: {
    width: 150,
    height: 150,
  },
  countContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  count: {
    marginRight: 20,
  },
  countText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Coin;
