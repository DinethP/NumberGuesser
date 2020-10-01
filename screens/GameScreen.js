import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  // Prevent the computer from instantly guessing user's input
  if (rndNum == exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  // The state will only be set once, because we run the generateRandomNumber function inside useState(),
  // so it will only run when no state is set, which is only once. It doesn't run once the state is set intially
  const [currentGuess, setcurrentGuess] = useState(
    generateRandomNumber(1, 100, props.userChoice)
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
