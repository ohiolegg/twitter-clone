import { configureStore, Store } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import randomUsers from "./slices/randomUsers"
import tagsSlice from "./slices/tagsSlice"
import tweetSlice from "./slices/tweetSlice"

const store = configureStore({
    reducer: {
        tweets: tweetSlice,
        tags: tagsSlice,
        auth: authSlice,
        users: randomUsers
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
