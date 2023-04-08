import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const Button = ({
  title = "Button",
  onPress = () => {},
  color = colors.WHITE,
  textColor = colors.BLACK,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container(color), ...style }}
      onPress={onPress}
    >
      <Text style={styles.title(textColor)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color) => ({
    backgroundColor: color,
    width: width * 0.95,
    height: width * 0.1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  }),
  title: (c) => ({
    fontSize: 16,
    color: c,
    fontWeight: "400",
  }),
});
