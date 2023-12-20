import { createSlice } from '@reduxjs/toolkit'

export const ReserveSlice = createSlice({
    name: "ReserveSlice",
    initialState: {
        reservations: []
    },
    reducers: {
        makeReservation: (state, action) => {
            state.reservations.push(action.payload)
        }
    }
})

export const {makeReservation} = ReserveSlice.actions;
export default ReserveSlice.reducer;