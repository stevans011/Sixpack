import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBYkm2dLhgw1VW1ZkT9uOjTt1gUNu56UB8",
  authDomain: "beer-app-rn.firebaseapp.com",
  projectId: "beer-app-rn",
  storageBucket: "beer-app-rn.appspot.com",
  messagingSenderId: "787906353836",
  appId: "1:787906353836:web:cb30dc3ee9b0b9bb509d09",
  measurementId: "G-HSJEQFMPHH",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
