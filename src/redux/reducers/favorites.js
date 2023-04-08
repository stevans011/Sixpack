import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: 1,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    refreshFavorites: (state) => {
      if (state.favorites < 10) {
        state.favorites = state.favorites + 1;
      } else {
        state.favorites = 1;
      }
    },
  },
});

export default favoritesSlice.reducer;
export const favoritesSelect = (state) => state.favorites.favorites;
export const { refreshFavorites } = favoritesSlice.actions;
