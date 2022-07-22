import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {  axios } from '../../core/axios'
import {TweetState, LoadingState, Tweet, AddFormState} from './state'

const initialState: TweetState = {
    tweetsItems: [],
    addFormState: AddFormState.NEVER,
    loadingState: LoadingState.NEVER
}

export const fetchTweets = createAsyncThunk<Tweet[], undefined, {rejectValue: string}>(
    'tweets/fetchTweets', 
    async function(__, {rejectWithValue}){
        try{        
            const { data } = await axios.get('/tweets?_sort=id&_order=desc')
            return data.tweets
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    } 
)

export const addTweet = createAsyncThunk<Tweet, {text: string, images: string[]}, {rejectValue: string}>(
    'tweets/addTweet', 
    async function(payload, {rejectWithValue}){
        if(!payload){
            return rejectWithValue('Something went wrong')
        }
        try{     
            const tweetObj: Tweet = {
                _id: Math.random().toString(36).substr(2),
                createdAt: Math.random().toString(36).substr(2),
                text: payload.text,
                images: payload.images,
                user: {
                    fullname: "Oleg Polevich",
                    username: "ohioleg",
                    avatarUrl: "https://pbs.twimg.com/profile_images/1539381382467788801/7aC-DXz7_400x400.jpg"
                },
            }   
            const { data } = await axios.post('/tweets', tweetObj)
            return data
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    } 
)

export const removeTweet = createAsyncThunk<string, string, {rejectValue: string}>(
    'tweets/removeTweet', 
    async function(payload, {rejectWithValue}){
        if(!payload){
            return rejectWithValue('Something went wrong')
        }
        try{     
            const { data } = await axios.delete(`/tweets/${payload}`)
            return data
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    } 
)

const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        setAddFormState: (state, action: PayloadAction<AddFormState>) => {
            state.addFormState = action.payload
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchTweets.pending, (state, action) => {
                state.tweetsItems = [];
                state.loadingState = LoadingState.LOADING
            })
            .addCase(fetchTweets.fulfilled, (state, action) => {
                state.tweetsItems = action.payload;
                state.loadingState = LoadingState.LOADED
            })
            .addCase(fetchTweets.rejected, (state, action) => {
                state.loadingState = LoadingState.ERROR
            })


            .addCase(addTweet.pending, (state, action) => {
                state.addFormState = AddFormState.LOADING
            })
            .addCase(addTweet.fulfilled, (state, action) => {
                state.tweetsItems.unshift(action.payload);
                state.addFormState = AddFormState.LOADED
            })
            .addCase(addTweet.rejected, (state, action) => {
                state.addFormState = AddFormState.ERROR
            })


            .addCase(removeTweet.pending, (state, action) => {
                state.tweetsItems = state.tweetsItems.filter(tweet => tweet._id !== action.meta.arg);
            })


    }
})

export const { setAddFormState } = tweetSlice.actions

export default tweetSlice.reducer