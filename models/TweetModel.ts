import { Document, model, Schema } from "mongoose"
import { UserModelDocumentInterface, UserModelInterface } from "./UserModel"

export interface TweetModelInterface {
    _id?: string;
    text: string;
    user: string;
    images: string[]
}

export type TweetModelDocumentInterface = TweetModelInterface & Document

const TweetSchema = new Schema({
    text: {
        required: true,
        type: String
    },
    user: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    images: [{
        type: String
    }],
}, {
    timestamps: true
})

export default model('Tweet', TweetSchema);