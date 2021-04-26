import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Oxanium_200ExtraLight,
  Oxanium_300Light,
  Oxanium_400Regular,
  Oxanium_500Medium,
  Oxanium_600SemiBold,
  Oxanium_700Bold,
  Oxanium_800ExtraBold,
} from "@expo-google-fonts/oxanium";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Oxanium_200ExtraLight,
    Oxanium_300Light,
    Oxanium_400Regular,
    Oxanium_500Medium,
    Oxanium_600SemiBold,
    Oxanium_700Bold,
    Oxanium_800ExtraBold,
    "Kramatic Arcade": require("../../assets/fonts/ka1.ttf"),
    "Outline Pixel7": require("../../assets/fonts/outline_pixel-7.ttf"),
  });
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const radio_props = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
    { label: "Random", value: "random" },
  ];

  const onChangeText = (text) => {
    setName(text);
  };

  const play = () => {
    if (!name || !difficulty) {
      Alert.alert("Please enter your name and select difficulty first!");
    } else {
      navigation.navigate("Game", {
        name,
        difficulty,
      });
      setName("");
      setDifficulty("");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>WELCOME TO SUGOKU GAME!</Text>
        </View>
        <View style={styles.inputForm}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Kramatic Arcade",
            }}
          >
            Enter Your Name :
          </Text>
          <TextInput
            value={name}
            style={styles.nameInput}
            onChangeText={(text) => onChangeText(text)}
          />
          <Text
            style={{
              color: "white",
              marginTop: 70,
              fontSize: 20,
              fontFamily: "Kramatic Arcade",
            }}
          >
            Select Difficulty :
          </Text>
          <RadioForm
            radio_props={radio_props}
            initial={""}
            labelHorizontal={false}
            buttonColor={"#8b458b"}
            buttonSize={10}
            formHorizontal={true}
            labelColor={"white"}
            selectedButtonColor={"#8b458b"}
            selectedLabelColor={"white"}
            animation={false}
            onPress={(value) => setDifficulty(value)}
            style={{ marginTop: 20 }}
            labelStyle={{
              fontSize: 17,
              marginTop: 5,
              fontFamily: "Outline Pixel7",
            }}
          />
        </View>
        <View style={{ marginTop: 100 }}>
          <Pressable onPress={play}>
            <Text
              style={{
                fontFamily: "Kramatic Arcade",
                fontSize: 45,
                color: "white",
              }}
            >
              START!
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#150c1f",
  },
  welcome: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Kramatic Arcade",
  },
  inputForm: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 100,
  },
  nameInput: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "white",
    width: 250,
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Outline Pixel7",
  },
});

export default HomeScreen;
