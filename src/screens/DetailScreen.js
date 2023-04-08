import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DetailScreen(props) {
  const route = useRoute();
  const { id, title, content } = route.params;

  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
}
