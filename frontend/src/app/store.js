import { configureStore } from '@reduxjs/toolkit';
import postSliceReducer from '../features/post/postSlice'
import profileSlice from '../features/profile/profileSlice';
import userSliceReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    post: postSliceReducer,
    profile: profileSlice
  },
});
