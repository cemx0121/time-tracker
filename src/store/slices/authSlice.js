import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userData: null,
    authLoading: true,

    fetchingData: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.authLoading = false;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.authLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setFetchingData: (state, action) => {
      state.fetchingData = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setAuthLoading, setFetchingData } =
  authSlice.actions;

export default authSlice.reducer;
