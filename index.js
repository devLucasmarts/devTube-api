import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => {
    connection();
    console.log(`Connected on port ${port}!`);
});
