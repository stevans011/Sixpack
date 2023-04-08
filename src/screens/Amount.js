import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";

import { useSelector } from "react-redux";

import BeerHad from "../components/BeerHad";
import { beersSelect } from "../redux/reducers/beers";
import Input from "../components/Input";
const { width } = Dimensions.get("window");

const Amount = ({ navigation }) => {
  const beers = useSelector(beersSelect);
  const noOfBeers = useMemo(() => {
    let total = 0;
    beers.forEach((item) => {
      total += Number(item.noOfBeers);
    });
    return String(total) || "0";
  }, [beers.length]);

  const amountOfCalories = useMemo(() => {
    let total = 0;
    beers.forEach((item) => {
      total += Number(item.noOfBeers) * Number(item.calories);
    });
    return String(total) || "0";
  }, [beers.length]);

  const onItemPress = (item) => {
    navigation.navigate("Beer", { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Amount"
        headingStyle={{
          color: colors.WHITE,
          fontSize: 20,
        }}
      />
      <View style={styles.mainView}>
        <ScrollView>
          {beers.map((beer, index) => (
            <BeerHad
              key={index}
              noOfBeers={beer.noOfBeers}
              title={beer.name}
              onPress={() => onItemPress(beer)}
            />
          ))}
        </ScrollView>

        <Input
          value={noOfBeers}
          disable={true}
          style={{ marginTop: 10 }}
          placeholder="How many did you drink today?"
        />
        <Input
          style={{ marginTop: 10 }}
          placeholder="Amount of calories:"
          value={amountOfCalories !== "NaN" ? amountOfCalories : "0"}
          disable={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  mainView: {
    paddingHorizontal: width * 0.025,
  },
});
