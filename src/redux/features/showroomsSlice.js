/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import newRequet from '../../utils/request'

const initialState = []

export const fetchShowRooms = createAsyncThunk(
    'showrooms/fetchShowRooms',
    async () => {
        const response = await newRequet.get('/showrooms/')

        return response.data
    }
)

export const showroomSlice = createSlice({
    name: 'showrooms',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShowRooms.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default showroomSlice.reducer

// export const { login, logout } = showroomSlice.actions
