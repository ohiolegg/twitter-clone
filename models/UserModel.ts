import { Document, model, Schema } from "mongoose"

export interface UserModelInterface {
    _id?: string,
    email:string
    fullname:string
    username:string
    password:string
    confirmHash:string
    tweets?: string[],
    location?:string
    confirmed?: boolean
    about?:string
    website?:string,
    avatarUrl?: string,
    bannerUrl?: string,
    likedPosts: string[];
}

export type UserModelDocumentInterface = UserModelInterface & Document

const UserSchema = new Schema<UserModelInterface>({

    email: {
        unique: true,
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    username: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    confirmHash: {
        required: true,
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    location: String,
    about: String,
    website: String,
    avatarUrl: String,
    bannerUrl: String
}, {
    timestamps: true
})

UserSchema.set('toJSON', {
    transform: function(doc, obj) {
        delete obj.password
        delete obj.confirmHash
        return obj 
    }
})

export default model('User', UserSchema);