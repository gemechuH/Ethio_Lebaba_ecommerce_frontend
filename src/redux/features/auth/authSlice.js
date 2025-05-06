import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if exists
const initialState = {
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      localStorage.removeItem("user"); // Clear invalid data
      return null;
    }
  })(),
  isAuthenticated: false, // Will be set to true if user exists
  token: localStorage.getItem("token") || null,
};

// Update isAuthenticated based on user
initialState.isAuthenticated = !!initialState.user;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Remove from localStorage
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Clear token too
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
