import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";

// firebase modules
import { useSelector } from "react-redux";
import { userSelect } from "../redux/reducers/user";

const Stack = createNativeStackNavigator();

const SignOutStack = () => (
  <Stack.Navigator initialRouteName="Signin">
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="Signin" component={SignInScreen} />
  </Stack.Navigator>
);

const NavigationStack = () => {
  const user = useSelector(userSelect);
  return (
    <NavigationContainer>
      <SignOutStack />
    </NavigationContainer>
  );
};

export default NavigationStack;
