import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { Row } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setBoardAsync, setLoading, setError } from "../stores/actions/board";
import { encodeParams } from "../helpers/encodeParams";
import { Button } from "react-native-elements";
import CountDown from "react-native-countdown-component";

const GameScreen = (props) => {
  const [playingBoard, setPlayingBoard] = useState([]);
  const { data: board, loading } = useSelector((state) => state);
  const { name, difficulty } = props.route.params;
  const dispatch = useDispatch();

  const setTimer = () => {
    if (difficulty === "easy") return 60 * 10;
    if (difficulty === "medium") return 60 * 20;
    if (difficulty === "hard") return 60 * 30;
    return 60 * 20;
  };

  const solveBoard = () => {
    Alert.alert(
      "Give Up and Solve",
      `Are you sure want to give up and solve the puzzle, ${name}?`,
      [
        { text: "NO" },
        {
          text: "YES",
          onPress: () => {
            dispatch(setLoading(true));
            fetch("https://sugoku.herokuapp.com/solve", {
              method: "POST",
              body: encodeParams({ board: playingBoard }),
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            })
              .then((response) => response.json())
              .then((data) => {
                setPlayingBoard(data.solution);
              })
              .catch((err) => dispatch(setError(err)))
              .finally((_) => dispatch(setLoading(false)));
          },
        },
      ]
    );
  };

  const validateBoard = () => {
    dispatch(setLoading(true));
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams({ board: playingBoard }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "solved") {
          props.navigation.replace("Win", { name });
        } else {
          Alert.alert(`You haven't finish this game yet, ${name}!`);
        }
      })
      .catch((err) => dispatch(setError(err)))
      .finally((_) => dispatch(setLoading(false)));
  };

  const newGame = () => {
    dispatch(
      setBoardAsync(
        `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
      )
    );
    setPlayingBoard(board);
  };

  const giveUp = () => {
    Alert.alert("Give Up", `Are you sure want to give up, ${name}?`, [
      { text: "NO" },
      { text: "YES", onPress: () => props.navigation.replace("Lose") },
    ]);
  };

  useEffect(() => {
    dispatch(
      setBoardAsync(
        `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
      )
    );
  }, []);

  useEffect(() => {
    setPlayingBoard(board);
  }, [board]);

  if (!playingBoard.length || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text
          style={{
            fontSize: 17,
            color: "#fff",
            marginTop: 10,
            fontFamily: "Kramatic Arcade",
          }}
        >
          Loading Board...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 30, marginTop: 100 }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Kramatic Arcade",
            color: "white",
            textAlign: "center",
          }}
        >
          Good Luck and Have Fun, {name}!
        </Text>
      </View>
      <CountDown
        until={setTimer()}
        size={17}
        onFinish={() => props.navigation.replace("Lose")}
        digitStyle={{ backgroundColor: "#8b458b" }}
        digitTxtStyle={{ color: "#fff" }}
        timeToShow={["M", "S"]}
        timeLabels={{ m: null, s: null }}
        style={{ marginBottom: 10 }}
      />
      <Text
        style={{ fontSize: 20, color: "white", fontFamily: "Outline Pixel7" }}
      >
        Difficulty: {difficulty}
      </Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {playingBoard.map((row, rowIndex) => (
            <Row
              row={row}
              rowIndex={rowIndex}
              setPlayingBoard={setPlayingBoard}
              playingBoard={playingBoard}
              key={rowIndex}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ marginRight: 50 }}>
          <View>
            <Button
              title="New Game"
              onPress={newGame}
              titleStyle={{
                color: "white",
                fontSize: 20,
                fontFamily: "Outline Pixel7",
              }}
              buttonStyle={{
                backgroundColor: "#8b458b",
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{ marginTop: 30, width: 150 }}>
            <Button
              title="Auto Solve"
              onPress={solveBoard}
              titleStyle={{
                color: "white",
                fontSize: 20,
                fontFamily: "Outline Pixel7",
              }}
              buttonStyle={{
                backgroundColor: "#8b458b",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View>
          <View>
            <Button
              title="Validate"
              onPress={validateBoard}
              titleStyle={{
                color: "white",
                fontSize: 20,
                fontFamily: "Outline Pixel7",
              }}
              buttonStyle={{
                backgroundColor: "#8b458b",
                borderRadius: 10,
              }}
            />
          </View>

          <View style={{ marginTop: 30, width: 150 }}>
            <Button
              title="Give Up"
              onPress={giveUp}
              titleStyle={{
                color: "white",
                fontSize: 20,
                fontFamily: "Outline Pixel7",
              }}
              buttonStyle={{
                backgroundColor: "#8b458b",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </View>
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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 35,
  },
  board: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#8b458b",
  },
  row: {
    flexDirection: "column",
  },
});

export default GameScreen;
