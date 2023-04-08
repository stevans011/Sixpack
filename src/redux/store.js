import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import favorites from "./reducers/favorites";
import beers from "./reducers/beers";

// config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "favorites", "beers"],
};

//  root reducer
const rootReducer = combineReducers({
  user: user,
  favorites: favorites,
  beers: beers,
});

const persiReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persiReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
