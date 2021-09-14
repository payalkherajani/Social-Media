import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'


export const loadFeedForUser = createAsyncThunk(
    "feed/user", async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/users/feed`, {
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


export const postSlice = createSlice({
    name: "post",
    initialState: {
        feed: [],
        loggedInUsersPosts: [],
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: {
        [loadFeedForUser.fulfilled]: (state, action) => {
            state.status = 'Feed Loaded';
            state.feed = action.payload?.posts
        },
        [loadFeedForUser.rejected]: (state, action) => {
            state.status = 'Failed To Fetch Feed';
            state.error = action.payload?.message
        }

    }
})

export default postSlice.reducer