import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;