import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

const ItemPlaceholder = ({
  title = `this is itemPlaceholders`,
  image = require("../assets/images/beer.png"),
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image} />
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ItemPlaceholder;

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: width * 0.3,
    backgroundColor: colors.GRAY,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    color: colors.GRAY,
  },
  image: {
    backgroundColor: colors.GRAY,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    marginRight: 10,
  },
});
