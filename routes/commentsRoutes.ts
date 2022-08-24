import express from 'express';

import { addComment } from '../controllers/commentController';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.post('/', verifyToken, addComment);

export default router;