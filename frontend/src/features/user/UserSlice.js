import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const registerANewUser = createAsyncThunk(
    "register/user", async ({ name, email, password }, { fulfillWithValue, rejectWithValue }) => {
        try {

            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/users/register`, { name, email, password })

            if (data?.success) {
                return fulfillWithValue(data)
            }

        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
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
        [registerANewUser.rejected]: (state, action) => {
            console.log(action.payload)
            state.status = 'rejected';
            state.error = action.payload.message
        }
    }
})

export default UserSlice.reducer