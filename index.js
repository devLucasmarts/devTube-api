import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';

const app = express();

dotenv.config();

const connection = () => {
    mongoose.connect(
        process.env.DB_CONNECTION
    ).then(() => {
        console.log("Connected to DB.");
    }).catch((err) => {
        throw err;
    });
};

const port = 3001;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
    connection();
    console.log(`Connected on port ${port}!`);
});
