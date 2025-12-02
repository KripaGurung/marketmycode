import { configureStore } from "@reduxjs/toolkit";
import registerFormReducer from "../pages/signup/registerFormSlice";
import loginReducer from "../pages/login/loginSlice";

export const store = configureStore({
  reducer: {
    registerForm: registerFormReducer,
    login: loginReducer,
  },
});

export default store;