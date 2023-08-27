import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reservations: [],
}

export const reserveSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers:{
        makeReservation: (state, action) => {
            state.reservations.push(action.payload)
        }
    }
})

export const {makeReservation} = reserveSlice.actions;
export default reserveSlice.reducer;