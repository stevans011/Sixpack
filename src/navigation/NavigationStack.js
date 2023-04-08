import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useState, useEffect } from "react";
// screens

import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
// firebase modules
import { useSelector } from "react-redux";
import { userSelect } from "../redux/reducers/user";
import Home from "../screens/Home";
import NavigationBottom from "./NavigationBottom";
// import Favorites from "../screens/Favorites";
// import Beer from "../screens/Beer";

const Stack = createNativeStackNavigator();

const SignOutStack = () => (
  <Stack.Navigator initialRouteName="Signin">
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="Signin" component={SignInScreen} />
  </Stack.Navigator>
);

const SignInStack = () => (
  <Stack.Navigator
    initialRouteName="BottomTab"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="BottomTab" component={NavigationBottom} />
    {/* <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="Beer" component={Beer} /> */}
  </Stack.Navigator>
);

const NavigationStack = () => {
  const user = useSelector(userSelect);
  return (
    <NavigationContainer>
      {user != null ? <SignInStack /> : <SignOutStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;
