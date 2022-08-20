import { Schema, model, connect } from 'mongoose';


interface User {
    user: string;

    email: string;

    password: string;

    img: string;

    subscribers: number;

    subscribedUsers: [string];
}

const UserSchema = new Schema<User>({
    user: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
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
})

export default model<User>('User', UserSchema);

// const UserSchema = new mongoose.Schema({
//     user: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     password: {
//         type: String,
//         required: true,
//     },

//     img: {
//         type: String,
//     },

//     subscribers: {
//         type: Number,
//         default: 0,
//     },

//     subscribedUsers: {
//         type: [String],
//     },

// }, { timestamps: true });

// export default mongoose.model("User", UserSchema);