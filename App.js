import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
// Make the splash screen remain till something (here it will be fonts)
// finishes loading
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    // these fonts will be available throughout the app to be used
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  // guessRounds can only be greater than 0 if the game is over
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  // if data not loaded, show splash screen till fonts are loaded
  if (!dataLoaded) {
    return (
      <AppLoading
        // this function must return a promise
        startAsync={fetchFonts}
        // set to true so that App componenet can render
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (number) => {
    setUserNumber(number);
  };

  const gameOverHandler = (roundNumber) => {
    // only place when guessRounds is updated
    setGuessRounds(roundNumber);
  };

  const restartGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  // conditionally load the StartGame screen or the GameScreen
  // pass the handler function as a prop, which will set the userNumber
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // if the userNumber is available and the game starts, the GameScreen
  // is showed and it's value is passed as a prop
  // guessRound equal to 0 means game is about to start/running
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        rounds={guessRounds}
        number={userNumber}
        onRestart={restartGame}
      />
    );
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
