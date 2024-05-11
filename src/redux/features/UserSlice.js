import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import newRequet from '../../utils/request'

const initialState = {
    userId: '',
    username: '',
    roleName: '',
    email: '',
    showroomId: ''
}

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (username) => {
        const response = await newRequet.get(`/users/${username}`)

        console.log(response.data)
        
        return response.data
    }
)

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        clearUserData: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.roleName = action.payload.roleName
            state.username = action.payload.username
            state.showroomId = action.payload.showroomId
        })
    }
});

export const {clearUserData} = UserSlice.actions;
export default UserSlice.reducer;