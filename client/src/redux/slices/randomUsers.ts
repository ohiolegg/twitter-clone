import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axios } from '../../core/axios'
import {LoadingState, RandomUsersState, User} from './state'

const initialState: RandomUsersState = {
    usersItems: [],
    loadingState: LoadingState.NEVER
}

export const fetchUsers = createAsyncThunk<User[], undefined, {rejectValue: string}>(
    'randomUsers/fetchUsers', 
    async function(__, {rejectWithValue}){
        try{        
            const { data } = await axios.get('/users')
            return data.users
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    } 
)

const randomUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchUsers.pending, (state, action) => {
                state.usersItems = [];
                state.loadingState = LoadingState.LOADING
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersItems = action.payload;
                state.loadingState = LoadingState.LOADED
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loadingState = LoadingState.ERROR
            })

    }
})

export default randomUsersSlice.reducer