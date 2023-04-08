import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Item from "../components/Item";
import colors from "../constants/colors";
import Button from "../components/Button";
import { useSelector } from "react-redux";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/Config";
import { userSelect } from "../redux/reducers/user";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { favoritesSelect } from "../redux/reducers/favorites";
const { width, height } = Dimensions.get("window");

const Favorites = ({ navigation }) => {
  const user = useSelector(userSelect).user;
  const [beers, setBeers] = useState([]);
  const callApi = useSelector(favoritesSelect);
  console.log("callApi", callApi);

  const onItemPress = (item) => {
    navigation.navigate("Beer", { item });
  };

  useEffect(() => {
    getDocs(collection(db, "users", user.uid, "favorites"))
      .then((querySnapshot) => {
        let favIds = [];
        querySnapshot.forEach((doc) => {
          favIds.push(doc.data().id);
        });
        return favIds;
      })
      .then((favIds) => {
        getDoc(doc(db, "beers", "list")).then((doc) => {
          if (doc.exists()) {
            setBeers(
              doc.data().beers.filter((beer) => favIds.includes(beer.id))
            );
          } else {
            console.log("No such document!");
          }
        });
      })
      .then(() => {
        if (callApi > 1) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Favorites refreshed",
          });
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Something went wrong",
        });
        isFav = false;
      });
  }, [callApi]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Favorites"
        headingStyle={{
          color: colors.WHITE,
          fontSize: 20,
        }}
      />
      <View style={styles.mainView}>
        {beers.length > 0 ? (
          <ScrollView>
            {beers.map((beer, index) => (
              <Item
                key={index}
                image={{ uri: beer.image_url }}
                title={beer.name}
                onPress={() => onItemPress(beer)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text>No favorites yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.REDDISH,
  },
  mainView: {
    paddingHorizontal: width * 0.025,
  },
});
