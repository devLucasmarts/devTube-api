import { Schema, model } from 'mongoose';
import User from '../dtos/User.dto';

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    img: {
        type: String,
    },

    subscribers: {
        type: Number,
        default: 0,
    },

    subscribedUsers: {
        type: [String],
    },
}, { timestamps: true })

export default model<User>('User', UserSchema);
