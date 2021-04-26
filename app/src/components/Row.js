import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useSelector } from "react-redux";

const Row = ({ row, rowIndex, setPlayingBoard, playingBoard }) => {
  const onChangeText = (text, rowIndex, colIndex) => {
    const newBoard = JSON.parse(JSON.stringify(playingBoard));
    newBoard[rowIndex][colIndex] = +text;
    setPlayingBoard(newBoard);
  };
  const board = useSelector((state) => state.data);

  return (
    <View style={styles.column}>
      {row.map((col, colIndex) => (
        <TextInput
          value={col > 0 ? String(col) : ""}
          editable={board[rowIndex][colIndex] > 0 ? false : true}
          onChangeText={(text) => onChangeText(text, rowIndex, colIndex)}
          style={
            rowIndex === 2 && colIndex === 2 && board[rowIndex][colIndex] > 0
              ? styles.rowColBorderColor
              : rowIndex === 2 && colIndex === 2
              ? styles.rowColBorder
              : rowIndex === 2 &&
                colIndex === 5 &&
                board[rowIndex][colIndex] > 0
              ? styles.rowColBorderColor
              : rowIndex === 2 && colIndex === 5
              ? styles.rowColBorder
              : rowIndex === 5 &&
                colIndex === 2 &&
                board[rowIndex][colIndex] > 0
              ? styles.rowColBorderColor
              : rowIndex === 5 && colIndex === 2
              ? styles.rowColBorder
              : rowIndex === 5 &&
                colIndex === 5 &&
                board[rowIndex][colIndex] > 0
              ? styles.rowColBorderColor
              : rowIndex === 5 && colIndex === 5
              ? styles.rowColBorder
              : (colIndex === 2 && board[rowIndex][colIndex] > 0) ||
                (colIndex === 5 && board[rowIndex][colIndex] > 0)
              ? styles.colBorderColor
              : colIndex === 2 || colIndex === 5
              ? styles.colBorder
              : (rowIndex === 2 && board[rowIndex][colIndex] > 0) ||
                (rowIndex === 5 && board[rowIndex][colIndex] > 0)
              ? styles.rowBorderColor
              : rowIndex === 2 || rowIndex === 5
              ? styles.rowBorder
              : board[rowIndex][colIndex] > 0
              ? styles.boxBorderColor
              : styles.boxBorder
          }
          key={colIndex}
          maxLength={1}
          keyboardType={"number-pad"}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "row",
  },
  boxBorder: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "white",
  },
  boxBorderColor: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "#add7bf",
  },
  colBorder: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderRightWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "white",
  },
  colBorderColor: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderRightWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "#add7bf",
  },
  rowBorder: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderBottomWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "white",
  },
  rowBorderColor: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderBottomWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "#add7bf",
  },
  rowColBorder: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "white",
  },
  rowColBorderColor: {
    fontSize: 30,
    borderColor: "#8b458b",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderWidth: 0.5,
    textAlign: "center",
    width: 40,
    height: 40,
    color: "black",
    backgroundColor: "#add7bf",
  },
});

export default Row;
