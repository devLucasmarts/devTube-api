import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/usersRoutes';
import videoRoutes from './routes/videosRoutes';
import commentsRoutes from './routes/commentsRoutes';
import 'express-async-errors';
import connection from './models/Connection';
import cookieParser from 'cookie-parser';

const app = express();

const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);
app.use(videoRoutes);
app.use(commentsRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    const { name, message, details } = err as any;
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
});

app.listen(port, () => {
    connection();
    console.log(`Connected on port ${port}!`);
});
