import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

const initialState = { userId: userId, token: token, isLoggedIn: !!token };

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