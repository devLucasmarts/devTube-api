import dotenv from 'dotenv';

import {  connect  } from 'mongoose';

dotenv.config();

const connection = () => {
    connect(
        process.env.DB_CONNECTION ?? ''
    ).then(() => {
        console.log("Connected to DB.");
    }).catch((err) => {
        throw err;
    });
};

export default connection;