import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const registerANewUser = createAsyncThunk(
    "register/user", async ({ name, email, password }, { fulfillWithValue, rejectWithValue }) => {
        const { data } = await axios.post(`${process.env.REACT_API_URL}/api/users/register`, { name, email, password })
        if (data?.success) {
            fulfillWithValue(data)
        } else {
            rejectWithValue(data)
        }
    }
)


export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        isUserLoggedIn: false,
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: {
        [registerANewUser.fulfilled]: (state, action) => {
            state.status = 'success'
        },
        [registerANewUser.rejectWithValue]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload.message
        }
    }
})

export default UserSlice.reducer