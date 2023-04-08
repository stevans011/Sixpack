import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Touchable,
} from "react-native";
import React, { useRef } from "react";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("window");

const Input = ({
  inputPlaceholder = "0",
  placeholder = "Input",
  onChange = () => {},
  color = colors.WHITE,
  style = {},
  value = "",
  disable = false,
}) => {
  const input = useRef(null);
  return (
    <TouchableOpacity
      style={{ ...styles.container(color), ...style }}
      activeOpacity={0.95}
      onPress={() => {
        input.current.focus();
      }}
    >
      <Text>
        <Text style={{ color: colors.GRAY }}>{placeholder}</Text>
      </Text>
      <TextInput
        placeholder={inputPlaceholder}
        editable={!disable}
        value={value}
        onChangeText={onChange}
        style={styles.title}
        ref={input}
        numberOfLines={1}
      />
    </TouchableOpacity>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: (color) => ({
    backgroundColor: color,
    width: width * 0.95,
    height: width * 0.1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  }),
  title: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
    minWidth: 40,
  },
});
