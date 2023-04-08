import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import images from "../assets/images";

const { height, width } = Dimensions.get("window");

const Header = ({
  color = "white",
  title,
  rightButton = <View></View>,
  showBack = false,
  headingStyle = {},
  rightButtonWidth,
}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        {showBack ? (
          <TouchableOpacity
            onPress={goBack}
            style={{ width: rightButtonWidth }}
          >
            <Image source={images.BACK} style={styles.back(color)} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: rightButtonWidth }}></View>
        )}
        <Text style={{ ...styles.header(color), ...headingStyle }}>
          {title}
        </Text>
        <View
          style={{
            minWidth: showBack ? width * 0.05 : null,
            width: rightButtonWidth,
          }}
        >
          {rightButton}
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width * 0.1,
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
  },
  back: (color) => ({
    width: width * 0.05,
    height: width * 0.05,
    tintColor: color,
  }),
  header: (color) => ({
    flex: 1,
    textAlign: "center",

    fontSize: 16,
    color: color,
    fontWeight: "bold",
  }),
});
