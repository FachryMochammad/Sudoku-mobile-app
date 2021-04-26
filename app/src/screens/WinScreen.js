import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const WinScreen = (props) => {
  const { name } = props.route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/SpartaIcon8.gif")}
        style={{ height: 300, width: 300, marginBottom: 50 }}
      />
      <Text style={styles.winText}>
        Congratulation you have beat this game, {name}!
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.replace("Home")}
      >
        <Text style={styles.textStyle}>Play Again!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#150c1f",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 50,
    backgroundColor: "#8b458b",
    width: 200,
  },
  textStyle: {
    color: "white",
    fontFamily: "Outline Pixel7",
    textAlign: "center",
    fontSize: 15,
  },
  winText: {
    color: "white",
    fontFamily: "Kramatic Arcade",
    textAlign: "center",
    fontSize: 30,
  },
});

export default WinScreen;
