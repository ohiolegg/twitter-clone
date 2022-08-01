import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { id } from 'date-fns/locale'
import {  axios } from '../../core/axios'
import {TweetState, LoadingState, Tweet, AddFormState, Comment} from './state'

const initialState: TweetState = {
    tweetsItems: [],
    addFormState: AddFormState.NEVER,
    loadingState: LoadingState.NEVER,
    comments: []
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
                likes: 0,
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

export const addComment = createAsyncThunk<Tweet, {text: string, tweet: string, images: string[]}, {rejectValue: string}>(
    'tweets/addComment', 
    async function(payload, {rejectWithValue}){
        if(!payload){
            return rejectWithValue('Something went wrong')
        }
        try{     
            const tweetObj: Tweet = {
                _id: Math.random().toString(36).substr(2),
                createdAt: Math.random().toString(36).substr(2),
                text: payload.text,
                likes: 0,
                images: payload.images,
                user: {
                    fullname: "Oleg Polevich",
                    username: "ohioleg",
                    avatarUrl: "https://pbs.twimg.com/profile_images/1539381382467788801/7aC-DXz7_400x400.jpg"
                },
            }   
            const { data } = await axios.post(`/tweets/comment/${payload.tweet}`, tweetObj)
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

export const fetchAddLike = createAsyncThunk<Tweet, string, {rejectValue: string}>(
    'tweets/fetchAddLike', 
    async function(payload, {rejectWithValue}){
        if(!payload){
            return rejectWithValue('Something went wrong')
        }
        try{     
            const { data } = await axios.patch(`/likes/${payload}`)
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
        },

        setCommentsByPost: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload
        },

        addLike: (state, action: PayloadAction<{_id: string, n: number}>) => {
            state.tweetsItems.forEach((tweet, i) => {
                if(tweet._id === action.payload._id) {
                    if(action.payload.n === 1){
                        state.tweetsItems[i].likes++
                    }

                    if(action.payload.n === -1){
                        state.tweetsItems[i].likes--
                    }
                    
                }
            });
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


            .addCase(addComment.pending, (state, action) => {
                state.addFormState = AddFormState.LOADING
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.unshift(action.payload);
                state.addFormState = AddFormState.LOADED
            })
            .addCase(addComment.rejected, (state, action) => {
                state.addFormState = AddFormState.ERROR
            })
    }
})

export const { setAddFormState, setCommentsByPost, addLike } = tweetSlice.actions

export default tweetSlice.reducer