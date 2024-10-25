import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state)=> {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false;
            state.error = null;
        },
        loginEnd: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        updateUserStart:(action, state) => {
            state.loading = true,
            state.error = null
        },
        updateUserSuccess:(action, state) => {
            state.currentUser = action.payload
            state.loading = false;
        },
        updateUserEnd:(action, state) => {
            state.loading = false,
            state.error = action.payload
        },
        deleteUserStart:(action, state) => {
            state.loading = true,
            state.error = null
        },
        deleteUserSuccess:(action, state) => {
            state.currentUser = null
            state.loading = false;
        },
        deleteUserEnd:(action, state) => {
            state.loading = false,
            state.error = action.payload
        },
        logoutStart:(action, state) => {
            state.loading = true,
            state.error = null
        },
        logoutSuccess:(action, state) => {
            state.currentUser = null

        },
        logoutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginEnd,
    updateUserStart, 
    updateUserEnd, 
    updateUserSuccess,
    deleteUserSuccess,
    deleteUserEnd,
    deleteUserStart,
    logoutStart,
    logoutSuccess,
    logoutUserFailure
  } = userSlice.actions;
  
  export default userSlice.reducer;