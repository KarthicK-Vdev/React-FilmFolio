// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists in localStorage
    admin: localStorage.getItem('admin') || null,
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('admin', action.payload.admin);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.admin = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
