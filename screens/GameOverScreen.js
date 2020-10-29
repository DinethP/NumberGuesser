import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

function GameOverScreen({ rounds, number, onRestart }) {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.png")} style={styles.image} />
      </View>
      {/* only text components will inherit styles from it parents. Other components
      do not */}
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          {/* you can nest Text components */}
          Your phone needed <Text style={styles.highlight}>{rounds}</Text> to
          guess the number <Text style={styles.highlight}>{number}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>RESTART</MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
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
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
