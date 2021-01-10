import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

function GameOverScreen({ rounds, number, onRestart }) {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
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
    </ScrollView>
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
    marginVertical: Dimensions.get("window").width / 60,
  },
  imageContainer: {
    // dimensions will be set so that the image will be a square
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").width / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
