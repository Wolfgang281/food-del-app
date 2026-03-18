import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    city: null,
    state: null,
    address: null,
    shopsInMyCity: [],
    itemsInMyCity: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.loading = false;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
  },
});

export const {
  setUserData,
  clearUser,
  setCity,
  setState,
  setAddress,
  setShopsInMyCity,
  setItemsInMyCity,
} = userSlice.actions;

export default userSlice.reducer;
