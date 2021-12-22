import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadFeedForUser = createAsyncThunk(
    "feed/user", async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/users/feed`, {
                headers: {
                    'x-auth-token': localStorage.token
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

export const toggleLikeButtonPressed = createAsyncThunk(
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

export const getSelectedPostDetails = createAsyncThunk(
    "load/post", async ({ postId }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/posts/${postId}`, {
                headers: {
                    'x-auth-token': localStorage.token
                }
            })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const addComment = createAsyncThunk(
    "add/comment", async ({ postId, text }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/posts/addcomment/${postId}`, { text }, {
                headers: {
                    'x-auth-token': localStorage.token
                }
            })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const deleteComment = createAsyncThunk(
    "delete/comment", async ({ postId, commentId }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_URL}/api/posts/removecomment/${commentId}/${postId}`, {
                headers: {
                    'x-auth-token': localStorage.token
                }
            })
            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const getSuggestion = createAsyncThunk(
    "user/suggestion", async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/users/suggestions`, {
                headers: {
                    'x-auth-token': localStorage.token
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

export const toggleFollow = createAsyncThunk(
    "toggle/follow", async ({ followingpersonId }, { fulfillWithValue, rejectWithValue }) => {
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/users/following`, { followingpersonId }, {
                headers: {
                    'x-auth-token': localStorage.token
                }
            })

            if (data?.success) {
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState: {
        feed: [],
        status: 'idle',
        error: '',
        selectedPostDetails: {},
        suggestion: []
    },
    reducers: {
        goBackButtonIsPressed: (state) => {
            state.selectedPostDetails = {}
        },
    },
    extraReducers: {
        [loadFeedForUser.fulfilled]: (state, action) => {
            state.status = 'Feed Loaded';
            state.feed = action.payload?.posts
        },
        [loadFeedForUser.rejected]: (state, action) => {
            state.status = 'Failed To Fetch Feed';
            state.error = action.payload?.message
        },
        [toggleLikeButtonPressed.fulfilled]: (state, action) => {
            state.status = 'Post Liked';
            state.feed = state.feed.map((oneuserPost) => {
                return oneuserPost.map((post) => {
                    if (post._id == action.payload.post._id) {
                        return action.payload.post
                    }
                    return post
                })
            })
        },
        [toggleLikeButtonPressed.rejected]: (state, action) => {
            state.status = 'Something went wrong in liking post'
        },
        [getSelectedPostDetails.fulfilled]: (state, action) => {
            state.status = 'Post Fetch Success';
            state.selectedPostDetails = action?.payload?.post
        },
        [getSelectedPostDetails.rejected]: (state, action) => {
            state.status = 'Post Fetch Fail';
            state.error = action?.payload?.message
        },
        [addComment.fulfilled]: (state, action) => {
            state.status = 'Added Comment Success';
            state.selectedPostDetails = action?.payload?.post
        },
        [addComment.rejected]: (state, action) => {
            state.status = 'Added Comment Failed';
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.status = 'Delete Comment Success';
            state.selectedPostDetails = action?.payload?.post
        },
        [deleteComment.rejected]: (state, action) => {
            state.status = 'Delete Comment Failed';
        },
        [getSuggestion.fulfilled]: (state, action) => {
            state.status = 'Suggestions Success';
            state.suggestion = action?.payload?.users
        },
        [getSuggestion.rejected]: (state, action) => {
            state.status = 'Suggestions Success';
        },
        [toggleFollow.fulfilled]: (state, action) => {
            state.status = 'Toggle Follow Success';
            state.suggestion = action?.payload?.filterUsers
        },
        [toggleFollow.rejected]: (state, action) => {
            state.error = action?.payload?.message
        }


    }
})

export const {
    goBackButtonIsPressed
} = postSlice.actions

export default postSlice.reducer