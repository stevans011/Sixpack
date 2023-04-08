import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Favorites from "../screens/Favorites";
import Home from "../screens/Home";
import { Dimensions, Platform } from "react-native";
import { Image, Text, View } from "react-native";
import images from "../assets/images";
import colors from "../constants/colors";
import Amount from "../screens/Amount";

const BottomTab = createBottomTabNavigator();

const { height, width } = Dimensions.get("window");

const NavigationBottom = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: height * 0.09,
          backgroundColor: colors.WHITE,
          paddingTop: Platform.OS === "ios" ? 10 : 0,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabImage focused={focused} name="Beers" icon={images.BEER} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calculate"
        component={Amount}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabImage focused={focused} name="Amount" icon={images.SUGAR} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabImage focused={focused} name="Favorites" icon={images.STAR} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default NavigationBottom;

const TabImage = ({
  focused,
  name,
  icon,
  selectedColor = colors.BLACK,
  defaultColor = colors.GRAY,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          width: width * 0.05,
          height: height * 0.05,
          tintColor: focused ? selectedColor : defaultColor,
        }}
        resizeMode="contain"
        source={icon}
      />
      {name && (
        <Text
          style={{
            fontSize: 16,
            color: focused ? selectedColor : defaultColor,
          }}
        >
          {name}
        </Text>
      )}
    </View>
  );
};
