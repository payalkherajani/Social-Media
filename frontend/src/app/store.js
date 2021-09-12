import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import UserSliceReducer from '../features/user/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: UserSliceReducer
  },
});
