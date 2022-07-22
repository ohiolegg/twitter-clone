import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axios } from '../../core/axios'
import {LoadingState, Tag, TagsState} from './state'

const initialState: TagsState = {
    tagsItems: [],
    loadingState: LoadingState.NEVER
}

export const fetchTags = createAsyncThunk<Tag[], undefined, {rejectValue: string}>(
    'tweets/fetchTags', 
    async function(__, {rejectWithValue}){
        try{        
            const { data } = await axios.get('/tags')
            return data
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    } 
)

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchTags.pending, (state, action) => {
                state.tagsItems = [];
                state.loadingState = LoadingState.LOADING
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tagsItems = action.payload;
                state.loadingState = LoadingState.LOADED
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loadingState = LoadingState.ERROR
            })

    }
})

export default tagsSlice.reducer