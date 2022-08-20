import { Router } from 'express';
import { signup } from '../controllers/authController';

const router = Router();

router.post("/api/auth/signup", signup);

router.post("/api/auth/signin", );

router.post("/api/auth/google", );

export default router;
