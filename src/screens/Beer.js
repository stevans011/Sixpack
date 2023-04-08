import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import images from "../assets/images";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  favoritesSelect,
  refreshFavorites,
  removeFavorite,
} from "../redux/reducers/favorites";
import Input from "../components/Input";
import { addBeer, beersSelect, removeBeer } from "../redux/reducers/beers";
import Toast from "react-native-toast-message";
import { userSelect } from "../redux/reducers/user";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/Config";

const { width, height } = Dimensions.get("window");

const Beer = (props) => {
  const [isFav, setIsFav] = useState(undefined);
  const [favId, setFavId] = useState(undefined);
  const user = useSelector(userSelect).user;

  const [noOfBeers, setNoOfBeers] = React.useState("");
  const item = props.route.params.item;
  const amountOfCalories = useMemo(() => {
    return String(Number(noOfBeers) * item.calories);
  }, [noOfBeers]);

  const inAmu =
    useSelector(beersSelect).findIndex((element) => element.id === item.id) !==
    -1;

  useEffect(() => {
    getDocs(collection(db, "users", user.uid, "favorites"))
      .then((querySnapshot) => {
        let is = false;
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          if (doc.data().id === item.id) {
            setFavId(doc.id);
            is = true;
            return;
          }
        });

        setIsFav(is);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Something went wrong",
        });
        isFav = false;
      });
  }, []);

  const dispatch = useDispatch();
  const addToFav = () => {
    if (isFav === false) {
      addDoc(collection(db, "users", user.uid, "favorites"), {
        id: item.id,
      }).then((res) => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Added to favorites",
        });
        setFavId(res.id);
        setIsFav(true);
        dispatch(refreshFavorites());
      });
    } else if (isFav === true) {
      deleteDoc(doc(db, "users", user.uid, "favorites", favId)).then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Removed from favorites",
        });
        setIsFav(false);
        dispatch(refreshFavorites());
      });
    }
  };

  const addToAmount = () => {
    if (inAmu) {
      dispatch(removeBeer(item));
    } else {
      if (
        noOfBeers === 0 ||
        noOfBeers === "" ||
        String(noOfBeers).match(/^[0-9]+$/) === null
      ) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter a valid number",
        });
      } else {
        dispatch(addBeer({ ...item, noOfBeers }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headingStyle={{
          fontSize: 20,
        }}
        showBack
      />
      <View style={styles.mainView}>
        {/*Image*/}
        <View style={styles.imageView}>
          <Text style={styles.beerTitle}>{item.name}</Text>
          <Image source={{ uri: item.image_url }} style={styles.image} />
        </View>
        {/*Details*/}
        <View style={styles.view}>
          <Text>{`Calories (in grams): ${item.calories}`}</Text>
        </View>
        <Input
          value={String(noOfBeers)}
          onChange={(text) => setNoOfBeers(text)}
          style={{ marginBottom: 10 }}
          placeholder="How many did you drink today?"
        />
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Amount of calories:"
          value={amountOfCalories !== "NaN" ? String(amountOfCalories) : "0"}
          disable={true}
        />
        {/*Add to fav*/}
        <Button
          onPress={addToFav}
          title={
            isFav === false
              ? "Add to favorites"
              : isFav === true
              ? "Remove from favorites"
              : "loading..."
          }
          color={colors.BLUEISH}
        />
        <Button
          style={{ marginTop: 10 }}
          onPress={addToAmount}
          title={inAmu ? "Remove from amount" : "Add to amount"}
          color={colors.BLUEISH}
        />
      </View>
    </SafeAreaView>
  );
};

export default Beer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  mainView: {
    paddingHorizontal: width * 0.025,
  },
  view: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,

    padding: 10,
    marginBottom: 10,
  },
  imageView: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
  },
  beerTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: width * 0.95,
    height: height * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
});
