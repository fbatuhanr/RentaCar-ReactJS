import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import UserSlice from "../features/UserSlice";
import ReserveSlice from "../features/ReserveSlice";
import accountSlice from "../features/accountSlice";
import { showroomSlice } from "../features/showroomsSlice";

const reducers = combineReducers({
    UserSlice,
    ReserveSlice,
    account: accountSlice,
    showrooms: showroomSlice
});

const persistConfig = {
    key: "root",
    timeout: 100,
    storage,
    whitelist: ["UserSlice", "ReserveSlice"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default store;