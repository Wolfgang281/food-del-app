import { configureStore } from "@reduxjs/toolkit";
import ownerSlice from "./slices/ownerSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
  },
});
