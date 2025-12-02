import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;