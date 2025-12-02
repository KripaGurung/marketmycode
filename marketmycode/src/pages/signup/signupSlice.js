import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: "signup",
    initialState: {
        users: [],
    },

    reducers: {
        registerUser: (state, action) => {
            state.users.push(action.payload);
        },
    },
});

export const { registerUser } = signupSlice.actions;
export default signupSlice.reducer;