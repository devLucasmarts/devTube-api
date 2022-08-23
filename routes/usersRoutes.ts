import express from 'express';
import {
    deleteUserAccount,
    getUserAccount,
    likeVideo,
    subscribe,
    unsubscribe,
    updateUserAccount
} from '../controllers/userController';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.put("/api/users/:id", verifyToken, updateUserAccount);

router.delete("/api/users/:id", verifyToken, deleteUserAccount);

router.get("/api/users/find/:id", getUserAccount);

router.put("/api/users/sub/:id", verifyToken,subscribe);

router.put("/api/users/unsub/:id", verifyToken,unsubscribe);

router.put("/api/users/like/:id", verifyToken,likeVideo);

export default router;