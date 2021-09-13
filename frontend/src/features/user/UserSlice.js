import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerANewUser = createAsyncThunk(
    "register/user", async ({ name, email, password, navigate }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/users/register`, { name, email, password })
            if (data?.success) {
                navigate('/')
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    "login/user", async ({ email, password, navigate }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, { email, password })

            if (data?.success) {
                navigate('/feed')
                return fulfillWithValue(data)
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const getLoggedInUser = createAsyncThunk(
    "loggedInUser", async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/users`,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            )

            if (data?.success) {
                return data
            }
        } catch (err) {
            return err.response.data
        }
    }
)


export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        isUserLoggedIn: false,
        status: 'idle',
        error: '',
        userDetails: {}
    },
    reducers: {
        logoutButtonPressed: (state) => {
            state.token = '';
            state.isUserLoggedIn = false;
            state.status = 'idle';
            state.error = '';
            state.userDetails = {};
            localStorage.clear()
        }
    },
    extraReducers: {
        [registerANewUser.fulfilled]: (state) => {
            state.status = ' Registration Success'
        },
        [registerANewUser.rejected]: (state, action) => {
            state.status = 'Registartion Failed';
            state.error = action.payload
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isUserLoggedIn = true;
            state.token = action?.payload?.token;
            state.status = 'Success'
            state.userDetails = action?.payload?.loggedInUserDetails
            localStorage.setItem('token', action?.payload?.token)
        },
        [loginUser.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.status = 'Failed'
        },
        [getLoggedInUser.fulfilled]: (state, action) => {
            state.isUserLoggedIn = true;
            state.token = localStorage.getItem('token');
            state.status = 'Success'
            state.userDetails = action?.payload?.loggedInUserDetails
        },
        [getLoggedInUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'Failed'
        }
    }
})

export const {
    logoutButtonPressed
} = UserSlice.actions

export default UserSlice.reducer