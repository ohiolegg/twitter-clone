import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../core/axios";
import { AuthState, LoadingState, Login, User } from "./state";

const initialState : AuthState = {
    data: null,
    loadingState: LoadingState.NEVER,
    globalLoadingState: LoadingState.NEVER
}

export const fetchAuth = createAsyncThunk<User, Login, {rejectValue: string}>(
    'auth/fetchAuth',
    async function(params, {rejectWithValue}){
        try{    
            const { data } = await axios.post('/auth/signin', params)
            return data
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    }
)

export const fetchRegister = createAsyncThunk<User, Login, {rejectValue: string}>(
    'auth/fetchRegister',
    async function(params, {rejectWithValue}){
        try{    
            const { data } = await axios.post('/auth/signup', params)
            return data
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    }
)

export const fetchAuthMe = createAsyncThunk<User, undefined, {rejectValue: string}>(
    'auth/fetchAuthMe',
    async function(__, {rejectWithValue}){
        try{    
            const { data } = await axios.get('/users/me')
            return data.user
        }catch(e: any){
            return rejectWithValue(e.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.data = null;
            state.loadingState = LoadingState.NEVER;
            state.globalLoadingState = LoadingState.LOADED;
        },
        setAuthGlobalLoading: (state, action: PayloadAction<LoadingState>) => {
            state.globalLoadingState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state, action) => {
                state.data = null;
                state.loadingState = LoadingState.LOADING;
                state.globalLoadingState = LoadingState.LOADING
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingState = LoadingState.LOADED;
                state.globalLoadingState = LoadingState.LOADED
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.loadingState = LoadingState.ERROR;
                state.globalLoadingState = LoadingState.ERROR
            })


            .addCase(fetchRegister.pending, (state, action) => {
                state.data = null;
                state.loadingState = LoadingState.LOADING;
                state.globalLoadingState = LoadingState.LOADING
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadingState = LoadingState.LOADED;
                state.globalLoadingState = LoadingState.LOADED
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.loadingState = LoadingState.ERROR;
                state.globalLoadingState = LoadingState.ERROR
            })


            .addCase(fetchAuthMe.pending, (state, action) => {
                state.data = null;
                state.globalLoadingState = LoadingState.LOADING
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.globalLoadingState = LoadingState.LOADED
                state.loadingState = LoadingState.LOADED
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.globalLoadingState = LoadingState.ERROR
            })
    }   
})

export const selectIsAuth = ( state : any) => Boolean(state.auth.data)

export const { signOut, setAuthGlobalLoading } = authSlice.actions

export default authSlice.reducer