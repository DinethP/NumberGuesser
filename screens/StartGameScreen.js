import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  // Needed to hide number pad
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const inputHandler = (e) => {
    // Replace any non numeric input with empty string
    setEnteredValue(e.nativeEvent.text.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    // this updates the buttonWidth state everytime when screen rotates
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    // event listener that triggers function to update width state
    Dimensions.addEventListener("change", updateLayout);
    // cleanup: remove the event listener
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const confirmInputHandler = () => {
    // convert the number entered from string to integer
    const chosenNumber = parseInt(enteredValue);
    // check if number is valid and not negative
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        // Alert text values
        "Invalid Number!",
        "Number has to be a number between 1 and 99",
        // receives an object for the alert button properties
        // The button text is 'Okay', button style is detructive and the resetInputHandler is run on click
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  // confirmed output will only store the JSX if confirmed is true. Otherwise, with every refresh, it will
  // be undefined
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          // has to be called inside an anonymous function to prevent it running instantly
          onPress={() => props.onStartGame(selectedNumber)}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    // This component allows keyboard to be  hidden when you press outside Input field
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game</TitleText>
            {/*  All children withn Card component will be rendered inside Card component  */}
            <Card style={styles.inputContainer}>
              {/* wrapper component to apply custom fonts to Text */}
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChange={inputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                {/* this width uses our local state to get the updated width
                when orientation changes */}
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {/* Display confirmed output after clicking confirm */}
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    // using imported font
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: 90,
  //   // get the width of device screen
  //   width: Dimensions.get("window").width / 4,
  // },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
