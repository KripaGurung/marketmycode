import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  phone: "",
  country: "",
  interests: [],
  skill: "beginner",
  termsAccepted: false,
};

const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addInterest: (state, action) => {
      state.interests.push(action.payload);
    },
    removeInterest: (state, action) => {
      state.interests = state.interests.filter(i => i !== action.payload);
    },
    nextStep: (state) => {
      if (state.currentStep < 3) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1;
    },
    resetForm: () => initialState
  },
});

export const { updateField, addInterest, removeInterest, nextStep, prevStep, resetForm } = registerFormSlice.actions;
export default registerFormSlice.reducer;