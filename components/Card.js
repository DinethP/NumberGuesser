import React from "react";
import { View, StyleSheet } from "react-native";

// This is a highly reusable component. It renders any children inside the component definition
function Card(props) {
  return (
    // Overrrides style object with passed in styles to component
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    //  elevation property makes shadows work in Android
    elevation: 5,
    padding: 20,
    borderRadius: 10,
  },
});
export default Card;
