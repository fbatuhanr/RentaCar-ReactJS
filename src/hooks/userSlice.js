import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        fullName: '',
        phoneNumber: '',
    },
    reducers: {
        setUserData: (state, action) => {
            state.fullName = action.payload.fullName;
            state.phoneNumber = action.payload.phoneNumber;
        },
    },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;