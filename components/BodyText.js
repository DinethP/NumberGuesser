import React from "react";
import { StyleSheet, Text, View } from "react-native";

// this component helps to apply font family to components
// all Text components can be replaced with this component to apply this sryle
const BodyText = ({ children, style }) => {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
