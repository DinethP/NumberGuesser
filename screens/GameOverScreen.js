import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

function GameOverScreen({ rounds, number, onRestart }) {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.png")} style={styles.image} />
      </View>
      <BodyText>Number of rounds: {rounds}</BodyText>
      <BodyText>Number was: {number}</BodyText>
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
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GameOverScreen;
