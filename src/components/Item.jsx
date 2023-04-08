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

const Item = ({
  title = `this is items`,
  image = require("../assets/images/beer.png"),
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: width * 0.3,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    color: "black",
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    marginRight: 10,
  },
});
