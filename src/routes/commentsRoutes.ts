import express from 'express';

import {
    addComment,
    deleteComment,
    getComments
} from '../controllers/commentController';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.post('/api/video/comments/', verifyToken, addComment);
router.delete('/api/video/comments/:id', verifyToken, deleteComment);
router.get('/api/video/comments/:videoId', getComments);

export default router;