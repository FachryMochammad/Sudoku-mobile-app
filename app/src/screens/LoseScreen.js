import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const FinalScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.gameover}>GAME OVER!</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#150c1f",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 100,
    backgroundColor: "#8b458b",
    width: 200,
  },
  textStyle: {
    color: "white",
    fontFamily: "Outline Pixel7",
    textAlign: "center",
    fontSize: 15,
  },
  gameover: {
    color: "white",
    fontFamily: "Kramatic Arcade",
    fontSize: 50,
  },
});

export default FinalScreen;
