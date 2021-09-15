import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const updateProfile = createAsyncThunk(
    "register/user", async ({ avatar, bio }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/users`, { avatar, bio })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const getAllPostsOfUser = createAsyncThunk(
    "profile/posts", async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/posts/userposts`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            if (data?.success) {
                return data
            }
        } catch (err) {
            return err.response.data
        }
    }
)

export const updatePost = createAsyncThunk(
    "register/user", async ({ description, caption }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/users`, { description, caption })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const deletePost = createAsyncThunk(
    "register/user", async ({ postId }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_URL}/api/posts/${postId}`)
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const addPost = createAsyncThunk(
    "add/post", async ({ description, caption }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/posts`, { description, caption })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const toggleLikeProfileBtn = createAsyncThunk(
    "like/post", async ({ postId }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/posts/likes/${postId}`)
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loggedInUserPosts: [],
        status: 'idle',
        error: '',
        singlePostDetails: {},
    },
    reducers: {

    },
    extraReducers: {
        [getAllPostsOfUser.fulfilled]: (state, action) => {
            state.status = 'ALL POSTS FETCHED SUCCESS';
            state.loggedInUserPosts = action?.payload?.allPostsofUser
        },
        [getAllPostsOfUser.rejected]: (state, action) => {
            state.status = 'ALL POSTS FETCHED FAILED';
            state.error = action?.payload?.message
        },
        [addPost.fulfilled]: (state, action) => {
            state.status = 'New Post Added'
        },
        [addPost.rejected]: (state, action) => {
            state.status = 'New Post Added Failed';
            state.error = action?.payload?.message

        },
        [toggleLikeProfileBtn.fulfilled]: (state, action) => {
            state.status = 'Profile Post Liked';
        },
        [toggleLikeProfileBtn.rejected]: (state, action) => {
            state.status = 'Something went wrong in liking post'
        },
    }
})

export const {
} = profileSlice.actions

export default profileSlice.reducer