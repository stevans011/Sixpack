import { StyleSheet, useColorScheme, Text } from "react-native";
import NavigationStack from "./src/navigation/NavigationStack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Provider store={store}>
        <NavigationStack />
      </Provider>
      <Toast />
    </>
  );
}
