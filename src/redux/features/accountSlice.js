/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import newRequet from '../../utils/request'

const initialState = {
    username: '',
    accessToken: '',
    refreshToken: ''
}

export const fetchLogin = createAsyncThunk(
    'account/fetchLogin',
    async ({ username, password }) => {
        const response = await newRequet.post('/auth/login', {
            username, password
        })

        return response.data
    }
)

export const fetchRegister = createAsyncThunk(
    'account/fetchRegister',
    async ({ username, password, email, roleName }) => {
        const response = await newRequet.post('/auth/register', {
            username, password, email, roleName
        })

        return response.data.body 
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            return {
                ...action.payload
            }
        },
        logout: () => {
            localStorage.removeItem('accessToken')
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default accountSlice.reducer

export const { login, logout } = accountSlice.actions
