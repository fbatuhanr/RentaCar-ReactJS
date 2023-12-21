import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import UserSlice from "../features/UserSlice";
import ReserveSlice from "../features/ReserveSlice";

const reducers = combineReducers({
    UserSlice,
    ReserveSlice
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