import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Authenticated: false,
  User: {
    name: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    NotLogin: (state) => {
      state.Authenticated = false;
    },
    DoneLogin: (state) => {
      state.Authenticated = true;
    },
    setUser: (state, action) => {
      state.User = action.payload;
    },
    removeUser: (state) => {
      state.User = {
        name: "",
        email: "",
      };
    },
  },
});

export const { NotLogin, DoneLogin, setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
