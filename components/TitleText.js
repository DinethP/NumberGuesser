import React from "react";
import { StyleSheet, Text, View } from "react-native";

// this component helps to apply font family to components
// all Text components can be replaced with this component to apply this sryle
const TitleText = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
