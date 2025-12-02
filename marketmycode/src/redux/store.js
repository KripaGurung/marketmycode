import { configureStore } from "@reduxjs/toolkit";
import registerFormReducer from "../pages/signup/registerFormSlice";

export const store = configureStore({
  reducer: {
    registerForm: registerFormReducer,
  },
});

export default store;