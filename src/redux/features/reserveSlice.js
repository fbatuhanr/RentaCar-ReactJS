import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carModel: null,
}

export const reserveSlice = createSlice({
    name: 'reserveInfo',
    initialState,
    reducers:{
        reserveNow: (state, action) => {
            state.reserveData = action.payload
        }
    },
})

export const {reserveNow} = reserveSlice.actions;
export default reserveSlice.reducer;