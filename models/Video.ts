import { Schema, model } from 'mongoose';
import Video from '../dtos/Video.dto';

const VideoSchema = new Schema<Video>({
    userId: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    imgUrl: {
        type: String,
        required: true,
    },

    videoUrl: {
        type: String,
        required: true,
    },

    views: {
        type: Number,
        default: 0,
    },

    tags: {
        type: [String],
        default: [],
    },

    likes: {
        type: [String],
        default: [],
    },

    dislikes: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

export default model<Video>("Video", VideoSchema);
