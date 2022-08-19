import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';

import 'express-async-errors';

import { StatusCodes } from 'http-status-codes';

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

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
    const { name, message, details } = err;
    console.log(`name: ${name}`);

    switch (name) {
        case 'ValidationError':
            res.status(StatusCodes.BAD_REQUEST).json({ message: details[0].message });
            break;
        case 'NotFoundError':
            res.status(StatusCodes.NOT_FOUND).json({ message });
            break;
        case 'ConflictError':
            res.status(StatusCodes.CONFLICT).json({ message });
            break;
        default:
            console.error(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    };

    next();
})

app.listen(port, () => {
    connection();
    console.log(`Connected on port ${port}!`);
});
