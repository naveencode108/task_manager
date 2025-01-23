import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import contactSlice from './slices/contactSlice';

export const store=configureStore({
    reducer:{
        user:userSlice,
        contact:contactSlice
    }
})