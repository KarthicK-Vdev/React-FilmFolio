// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice'; // Replace this with your slice file

const store = configureStore({
    reducer: {
        auth: authReducer, // Add reducers for each slice
    },
});

export default store;
