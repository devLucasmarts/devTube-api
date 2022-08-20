import { Schema, model } from 'mongoose';

import Comment from '../dtos/Comment.dto';

const CommentSchema = new Schema<Comment>({
    userId: {
        type: String,
        required: true,
    },

    videoId: {
        type: String,
        required: true,
    },

    userComment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default model<Comment>('Comment', CommentSchema);
