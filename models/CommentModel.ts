import { model, Schema } from "mongoose"

export interface CommentModelInterface { 
    text: string;
    user: string;
    tweet: string;
}

export type CommentModelDocumentInterface = CommentModelInterface & Document

const CommentSchema = new Schema({
    text: {
        required: true,
        type: String
    },
    user: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    tweet: {
        required: true,
        ref: 'Tweet',
        type: Schema.Types.ObjectId
    },

},  {
    timestamps: true
})

export default model('Comment', CommentSchema);