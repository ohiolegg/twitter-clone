export enum LoadingState { 
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export enum AddFormState { 
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

// Tweets

export interface Tweet {
    _id: string,
    createdAt: string;
    text: string,
    images: string[],
    user: {
        _id?: string;
        fullname: string;
        username: string;
        avatarUrl: string;
    }
}

export interface TweetState { 
    tweetsItems: Tweet[];
    addFormState: AddFormState;
    loadingState: LoadingState
}

// Tags

export interface Tag {
    _id: string,
    name: string,
    count: number
}

export interface TagsState { 
    tagsItems: Tag[];
    loadingState: LoadingState
}

// Auth

export interface User{
    _id?: string,
    email: string,
    fullname: string;
    username: string;
    confirmed: boolean;
    tweets?: object[],
    avatarUrl?: string;
    location?: string;
    about?:string;
    website?: string;
    token?: string;
}

export interface AuthState{
    data: User | null;
    loadingState: LoadingState;
    globalLoadingState: LoadingState;
}

export interface Login{
    username: string;
    password: string;
}

//Random users

export interface RandomUsersState { 
    usersItems: User[] | [];
    loadingState: LoadingState
}