import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postSliceReducer from '../features/post/postSlice'
import userSliceReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSliceReducer,
    post: postSliceReducer
  },
});
