import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (number) => {
    setUserNumber(number);
  };

  // conditionally load the StartGame screen or the GameScreen
  // pass the handler function as a prop, which will set the userNumber
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // if the userNumber is available and the game starts, the GameScreen
  // is showed and it's value is passed as a prop
  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
