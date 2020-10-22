import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
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

const GameScreen = ({ userChoice, onGameOver }) => {
  // The state will only be set once, because we run the generateRandomNumber function inside useState(),
  // so it will only run when no state is set, which is only once. It doesn't run once the state is set intially
  const [currentGuess, setcurrentGuess] = useState(
    generateRandomNumber(1, 100, userChoice)
  );
  // These ref's survive component reloads. Values are preserved
  // The difference between ref and state is that changes to ref
  // values doesn't trigger a component re-render, while state does
  const [rounds, setRounds] = useState(0);
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    if (currentGuess == userChoice) {
      // pass no. of rounds taken to guess the number
      onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const handleGuess = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      // if you don't provider an onClick handler to Alert, it will auto close when you click the button
      Alert.alert("Are you sure?", "Try again", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      // react ref's are objects that has a .current property to access current value
      // set the current value to be new max
      currentMax.current = currentGuess;
    } else {
      currentMin.current = currentGuess;
    }
    // generate new guess with updated limits
    const newGuess = generateRandomNumber(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setcurrentGuess(newGuess);
    setRounds((curRounds) => curRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          onPress={
            // you use bind when you want pass a parameter to a function when
            // it gets called
            handleGuess.bind(this, "lower")
          }
        />
        <Button title="GREATER" onPress={handleGuess.bind(this, "greater")} />
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
