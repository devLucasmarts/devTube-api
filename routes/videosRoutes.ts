import express from 'express';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.post("/", verifyToken, )

export default router;