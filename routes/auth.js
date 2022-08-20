import express from 'express';
import { signup } from '../controllers/auth.js';

const router = express.Router();

router.post("/api/auth/signup", signup);

router.post("/api/auth/signin", );

router.post("/api/auth/google", );

export default router;
