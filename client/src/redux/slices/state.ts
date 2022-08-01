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
    likes: number;
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
    loadingState: LoadingState;
    comments: Comment[];
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
    likedPosts?: Tweet[];
    tweets?: Tweet[],
    avatarUrl?: string;
    bannerUrl?: string;
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

// Comments

export interface Comment {
    _id: string;
    text: string;
    createdAt: string;
    user: {
        _id?: string;
        fullname: string;
        username: string;
        avatarUrl: string;
    }
}