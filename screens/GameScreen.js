import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

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
// itemData is the default argument passed into renderItem call
// listLength is passed from .bind()
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  // The state will only be set once, because we run the generateRandomNumber function inside useState(),
  // so it will only run when no state is set, which is only once. It doesn't run once the state is set intially
  const initGuess = generateRandomNumber(1, 100, userChoice);
  const [currentGuess, setcurrentGuess] = useState(initGuess);
  const [guesses, setGuesses] = useState([initGuess.toString()]);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  // These ref's survive component reloads. Values are preserved
  // The difference between ref and state is that changes to ref
  // values doesn't trigger a component re-render, while state does
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get("window").height);
      setDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  useEffect(() => {
    if (currentGuess == userChoice) {
      // pass no. of rounds taken to guess the number
      onGameOver(guesses.length);
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
      currentMin.current = currentGuess + 1;
    }
    // generate new guess with updated limits
    const newGuess = generateRandomNumber(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setcurrentGuess(newGuess);
    setGuesses((curGuesses) => [newGuess.toString(), ...curGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (deviceWidth < 350) {
    listContainerStyle = style.listContainerBig;
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            onPress={
              // you use bind when you want pass a parameter to a function when
              // it gets called
              handleGuess.bind(this, "lower")
            }
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={handleGuess.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          {/* contentContainer style is a special style for ScrollView and FlatList */}
          {/* style content in the list */}
          {/* <ScrollView contentContainerStyle={styles.list}>
          {guesses.map((guess, index) =>
            renderListItem(guess, guesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={guesses}
            // .bind() allows us to pass extra arguments in addition to the defaul parameter
            renderItem={renderListItem.bind(this, guesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={
            // you use bind when you want pass a parameter to a function when
            // it gets called
            handleGuess.bind(this, "lower")
          }
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={handleGuess.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* contentContainer style is a special style for ScrollView and FlatList */}
        {/* style content in the list */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {guesses.map((guess, index) =>
            renderListItem(guess, guesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={guesses}
          // .bind() allows us to pass extra arguments in addition to the defaul parameter
          renderItem={renderListItem.bind(this, guesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    // flex property is needed to make it scrollable in Android
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    // flex property is needed to make it scrollable in Android
    flex: 1,
    width: "80%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#CCC",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GameScreen;
