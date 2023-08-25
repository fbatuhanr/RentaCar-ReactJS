import { configureStore } from '@reduxjs/toolkit'
import reserveReducer from "../features/reserveSlice";


export const store = configureStore({
    reducer: {
        reserveInfo: reserveReducer
    },
})