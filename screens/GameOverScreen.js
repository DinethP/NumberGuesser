import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function GameOverScreen({ rounds, number, onRestart }) {
  return (
    <View style={styles.screen}>
      <Text>The game is over</Text>
      <Text>Number of rounds: {rounds}</Text>
      <Text>Number was: {number}</Text>
      <Button title="Restart" onPress={onRestart}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
