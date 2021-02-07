import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";

const MainButton = ({ children, onPress }) => {
  // jsx  element- first letter is capital
  // we use ButtonComponent instrad of the imported component, so that we can
  // dynamically convert the jsx element to either TouchableOpacity or
  // TouchableNativeFeedback
  let ButtonComponent = TouchableOpacity;
  // only Android version 21 upwards has the button ripple effect
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
