import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beers: [],
};

const beersSlice = createSlice({
  name: "beers",
  initialState,
  reducers: {
    addBeer: (state, action) => {
      state.beers.push(action.payload);
    },
    removeBeer: (state, action) => {
      state.beers = state.beers.filter((item) => item.id !== action.payload.id);
    },
    removeAllBeers: (state) => {
      state.beers = [];
    },
  },
});

export default beersSlice.reducer;
export const beersSelect = (state) => state.beers.beers;
export const { addBeer, removeBeer, removeAllBeers } = beersSlice.actions;
