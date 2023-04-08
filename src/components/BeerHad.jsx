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
import beers from "../redux/reducers/beers";

const { width, height } = Dimensions.get("window");

const BeerHad = ({
  title = `this is items`,
  onPress = () => {},
  noOfBeers = 0,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{`+ ${title}`}</Text>
      <Text style={styles.name}>{noOfBeers}</Text>
    </TouchableOpacity>
  );
};

export default BeerHad;

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
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
