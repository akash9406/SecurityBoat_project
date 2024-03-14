import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
export const store = configureStore({
  reducer: {
    Users: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
