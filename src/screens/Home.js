import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Item from "../components/Item";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/user";
import { auth, db } from "../config/Config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import ItemPlaceholder from "../components/ItemPlaceholder";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Button from "../components/Button";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [beers, setBeers] = useState(null);
  const dispatch = useDispatch();

  const onItemPress = (item) => {
    navigation.navigate("Beer", { item });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Something went wrong",
        });
      });
  };

  useEffect(() => {
    getDoc(doc(db, "beers", "list")).then((doc) => {
      if (doc.exists()) {
        setBeers(doc.data().beers);
      } else {
        console.log("No such document!");
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="SixPack"
        headingStyle={{
          color: colors.WHITE,
          fontSize: 20,
        }}
        rightButtonWidth={70}
        rightButton={
          <Button
            title="Sign Out"
            textColor={colors.WHITE}
            color="transparent"
            onPress={handleSignOut}
          />
        }
      />
      <View style={styles.mainView}>
        <ScrollView>
          {beers
            ? beers.map((beer, index) => (
                <Item
                  key={index}
                  image={{ uri: beer.image_url }}
                  title={beer.name}
                  onPress={() => {
                    onItemPress(beer);
                  }}
                />
              ))
            : [1, 2, 3, 4].map((item) => <ItemPlaceholder key={item} />)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GREENISH,
  },
  mainView: {
    paddingHorizontal: width * 0.025,
  },
});
