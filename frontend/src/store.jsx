import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import taskSlice from './slices/task';

export const store=configureStore({
    reducer:{
      auth:authSlice,
      task:taskSlice
    }
})